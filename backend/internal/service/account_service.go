package service

import (
	"errors"
	"strings"
	"time"

	"githubaltmanager/internal/crypto"
	"githubaltmanager/internal/github"
	"githubaltmanager/internal/model"

	"gorm.io/gorm"
)

type AccountService struct {
	DB *gorm.DB
}

func NewAccountService(db *gorm.DB) *AccountService { return &AccountService{DB: db} }

// AccountOut 输出给前端的账户（解密敏感字段做掩码）
type AccountOut struct {
	model.Account
	HasPassword    bool   `json:"has_password"`
	RecoveryMasked string `json:"recovery_masked"`
	TokenMasked    string `json:"token_masked"`
}

// ToOut 转输出
func (s *AccountService) ToOut(a *model.Account) AccountOut {
	out := AccountOut{Account: *a}
	if a.PasswordEnc != "" {
		out.HasPassword = true
	}
	if a.RecoveryEmail != "" {
		if pt, err := crypto.DecryptField(a.RecoveryEmail); err == nil && pt != "" {
			out.RecoveryMasked = maskEmail(pt)
		}
	}
	if a.TokenEnc != "" {
		if pt, err := crypto.DecryptField(a.TokenEnc); err == nil && pt != "" {
			out.TokenMasked = maskToken(pt)
		}
	}
	// 清空加密字段
	out.TokenEnc = ""
	out.PasswordEnc = ""
	out.RecoveryEmail = ""
	return out
}

func maskToken(t string) string {
	if len(t) <= 8 {
		return strings.Repeat("*", len(t))
	}
	return t[:4] + strings.Repeat("*", len(t)-8) + t[len(t)-4:]
}

func maskEmail(e string) string {
	at := strings.Index(e, "@")
	if at <= 0 {
		return maskToken(e)
	}
	name := e[:at]
	domain := e[at:]
	if len(name) <= 2 {
		return name[:1] + "***" + domain
	}
	return name[:2] + "***" + domain
}

// ImportByToken 通过 token 导入账户，自动调用 /user 验证
func (s *AccountService) ImportByToken(c *Container, token, password, recoveryEmail, note string) (*model.Account, error) {
	if strings.TrimSpace(token) == "" {
		return nil, errors.New("token 不能为空")
	}

	// 用 token 调 /user 验证
	ghc := github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout)
	u, header, code, err := ghc.GetAuthenticatedUserWithHeader()
	if err != nil {
		return nil, err
	}
	if code >= 400 || u == nil || u.Login == "" {
		return nil, errors.New("token 验证失败，请检查 token 是否有效")
	}

	// 重复检查（仅检查未软删的账户）
	var existing model.Account
	if err := s.DB.Where("github_login = ? AND deleted_at IS NULL", u.Login).First(&existing).Error; err == nil {
		return nil, errors.New("账户 " + u.Login + " 已存在")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	scopes := github.ParseScopes(header)

	tokenEnc, err := crypto.EncryptField(token)
	if err != nil {
		return nil, err
	}
	pwEnc := ""
	if password != "" {
		pwEnc, err = crypto.EncryptField(password)
		if err != nil {
			return nil, err
		}
	}
	emailEnc := ""
	if recoveryEmail != "" {
		emailEnc, err = crypto.EncryptField(recoveryEmail)
		if err != nil {
			return nil, err
		}
	}

	displayName := u.Name
	if displayName == "" {
		displayName = u.Login
	}

	// 若存在同名软删账户，恢复它并更新 token
	var softDeleted model.Account
	if sdErr := s.DB.Where("github_login = ? AND deleted_at IS NOT NULL", u.Login).First(&softDeleted).Error; sdErr == nil {
		updates := map[string]any{
			"deleted_at":    nil,
			"github_id":     u.ID,
			"display_name":  displayName,
			"avatar_url":    u.AvatarURL,
			"token_enc":     tokenEnc,
			"status":        "active",
			"status_reason": "token 导入时验证通过",
			"token_scopes":  strings.Join(scopes, ","),
		}
		if pwEnc != "" {
			updates["password_enc"] = pwEnc
		}
		if emailEnc != "" {
			updates["recovery_email"] = emailEnc
		}
		if note != "" {
			updates["note"] = note
		}
		if err := s.DB.Model(&softDeleted).Updates(updates).Error; err != nil {
			return nil, err
		}
		softDeleted.DeletedAt = nil
		return &softDeleted, nil
	} else if !errors.Is(sdErr, gorm.ErrRecordNotFound) {
		return nil, sdErr
	}

	acc := model.Account{
		GithubID:      u.ID,
		GithubLogin:   u.Login,
		DisplayName:   displayName,
		AvatarURL:     u.AvatarURL,
		TokenEnc:      tokenEnc,
		PasswordEnc:   pwEnc,
		RecoveryEmail: emailEnc,
		Status:        "active",
		StatusReason:  "token 导入时验证通过",
		TokenScopes:   strings.Join(scopes, ","),
		Note:          note,
	}
	if err := s.DB.Create(&acc).Error; err != nil {
		return nil, err
	}
	return &acc, nil
}

// Update 更新账户的可选字段（password/recovery/note）
func (s *AccountService) Update(id uint, password, recoveryEmail, note *string) (*model.Account, error) {
	var acc model.Account
	if err := s.DB.First(&acc, id).Error; err != nil {
		return nil, err
	}
	updates := map[string]any{}
	if password != nil {
		if *password == "" {
			updates["password_enc"] = ""
		} else {
			enc, err := crypto.EncryptField(*password)
			if err != nil {
				return nil, err
			}
			updates["password_enc"] = enc
		}
	}
	if recoveryEmail != nil {
		if *recoveryEmail == "" {
			updates["recovery_email"] = ""
		} else {
			enc, err := crypto.EncryptField(*recoveryEmail)
			if err != nil {
				return nil, err
			}
			updates["recovery_email"] = enc
		}
	}
	if note != nil {
		updates["note"] = *note
	}
	if len(updates) > 0 {
		if err := s.DB.Model(&acc).Updates(updates).Error; err != nil {
			return nil, err
		}
	}
	s.DB.First(&acc, id)
	return &acc, nil
}

// Delete 删除账户
func (s *AccountService) Delete(id uint) error {
	return s.DB.Transaction(func(tx *gorm.DB) error {
		// 删除关联的仓库、workflow、任务
		tx.Where("account_id = ?", id).Delete(&model.Repository{})
		tx.Where("account_id = ?", id).Delete(&model.Workflow{})
		tx.Where("account_id = ?", id).Delete(&model.ScheduledTask{})
		return tx.Delete(&model.Account{}, id).Error
	})
}

// GetDecryptedToken 获取账户的明文 token
func (s *AccountService) GetDecryptedToken(id uint) (string, *model.Account, error) {
	var acc model.Account
	if err := s.DB.First(&acc, id).Error; err != nil {
		return "", nil, gorm.ErrRecordNotFound
	}
	token, err := crypto.DecryptField(acc.TokenEnc)
	if err != nil {
		return "", &acc, err
	}
	return token, &acc, nil
}

// CheckStatus 多方案并发检测账户封禁状态
func (s *AccountService) CheckStatus(c *Container, id uint) (*model.Account, error) {
	token, acc, err := s.GetDecryptedToken(id)
	if err != nil {
		return nil, err
	}
	result := github.CheckBanStatus(token, c.CFG.GitHub.APIBaseURL, acc.GithubLogin, c.CFG.GitHub.RequestTimeout)
	now := time.Now()
	acc.Status = result.Status
	acc.StatusReason = result.Reason
	acc.LastCheckedAt = &now
	if err := s.DB.Model(&model.Account{}).Where("id = ?", id).Updates(map[string]any{
		"status":          result.Status,
		"status_reason":   result.Reason,
		"last_checked_at": now,
	}).Error; err != nil {
		return nil, err
	}
	return acc, nil
}

// List 列出全部活跃账户（排除回收站）
func (s *AccountService) List() ([]model.Account, error) {
	var accs []model.Account
	err := s.DB.Where("deleted_at IS NULL").Order("id DESC").Find(&accs).Error
	return accs, err
}

// Get 获取单个账户（含回收站中的，供详情/恢复使用）
func (s *AccountService) Get(id uint) (*model.Account, error) {
	var acc model.Account
	err := s.DB.First(&acc, id).Error
	return &acc, err
}

// GetActive 获取单个活跃账户（排除回收站）
func (s *AccountService) GetActive(id uint) (*model.Account, error) {
	var acc model.Account
	err := s.DB.Where("id = ? AND deleted_at IS NULL", id).First(&acc).Error
	return &acc, err
}
