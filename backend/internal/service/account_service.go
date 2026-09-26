package service

import (
	"errors"
	"fmt"
	"log"
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
	RepoCount      int64  `json:"repo_count"`
	WorkflowCount  int64  `json:"workflow_count"`
	TaskCount      int64  `json:"task_count"`
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
	ghcCreated := github.ParseGitHubTime(u.CreatedAt)

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
		if ghcCreated != nil {
			updates["github_created_at"] = *ghcCreated
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
		GithubID:        u.ID,
		GithubLogin:     u.Login,
		DisplayName:     displayName,
		AvatarURL:       u.AvatarURL,
		TokenEnc:        tokenEnc,
		PasswordEnc:     pwEnc,
		RecoveryEmail:   emailEnc,
		Status:          "active",
		StatusReason:    "token 导入时验证通过",
		TokenScopes:     strings.Join(scopes, ","),
		GithubCreatedAt: ghcCreated,
		Note:            note,
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
	updates := map[string]any{
		"status":          result.Status,
		"status_reason":   result.Reason,
		"last_checked_at": now,
	}
	if result.GithubCreatedAt != nil {
		updates["github_created_at"] = *result.GithubCreatedAt
		acc.GithubCreatedAt = result.GithubCreatedAt
	}

	// 状态转换记录：跳过本次结果错误与"未变"，且新账户 5 分钟窗口内的检测不计入
	// （首检/复检用于确定初始状态，不构成"转换"）
	isFirstCheck := acc.FirstCheckedAt == nil
	withinNewWindow := acc.FirstCheckedAt != nil && now.Sub(*acc.FirstCheckedAt) <= 5*time.Minute
	if !isFirstCheck && !withinNewWindow && result.Status != "error" {
		prev := acc.Status
		if prev == "" {
			prev = "unknown"
		}
		if prev != result.Status {
			s.DB.Create(&model.StatusChange{
				AccountID:  id,
				FromStatus: prev,
				ToStatus:   result.Status,
				Reason:     result.Reason,
				CreatedAt:  now,
			})
		}
	}
	if isFirstCheck {
		updates["first_checked_at"] = now
		acc.FirstCheckedAt = &now
	}

	acc.Status = result.Status
	acc.StatusReason = result.Reason
	acc.LastCheckedAt = &now
	if err := s.DB.Model(&model.Account{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		return nil, err
	}
	return acc, nil
}

// GetGitHubProfile 拉取账户当前 GitHub 公开资料
func (s *AccountService) GetGitHubProfile(c *Container, id uint) (*github.User, error) {
	token, _, err := s.GetDecryptedToken(id)
	if err != nil {
		return nil, err
	}
	ghc := github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout)
	u, code, err := ghc.GetUserProfile()
	if err != nil {
		return nil, fmt.Errorf("api %d: %w", code, err)
	}
	return u, nil
}

// UpdateGitHubProfile 通过账户 token 更新 GitHub 公开资料，并同步本地 display_name 缓存
func (s *AccountService) UpdateGitHubProfile(c *Container, id uint, p github.UpdateUserProfilePayload) (*github.User, error) {
	token, acc, err := s.GetDecryptedToken(id)
	if err != nil {
		return nil, err
	}
	ghc := github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout)
	u, code, err := ghc.UpdateUserProfile(p)
	if err != nil {
		return nil, fmt.Errorf("api %d: %w", code, err)
	}
	displayName := u.Name
	if displayName == "" {
		displayName = u.Login
	}
	s.DB.Model(&model.Account{}).Where("id = ?", id).Update("display_name", displayName)
	_ = acc
	return u, nil
}

// GetEmailVisibility 返回账户主邮箱及其公开可见性（public / private）
func (s *AccountService) GetEmailVisibility(c *Container, id uint) (string, string, error) {
	token, _, err := s.GetDecryptedToken(id)
	if err != nil {
		return "", "", err
	}
	ghc := github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout)
	emails, code, err := ghc.ListEmails()
	if err != nil {
		return "", "", fmt.Errorf("api %d: %w", code, err)
	}
	for _, e := range emails {
		if e.Primary {
			return e.Email, e.Visibility, nil
		}
	}
	return "", "", errors.New("未找到主邮箱")
}

// SetEmailVisibility 设置账户主邮箱公开可见性（public / private）
func (s *AccountService) SetEmailVisibility(c *Container, id uint, visibility string) error {
	token, _, err := s.GetDecryptedToken(id)
	if err != nil {
		return err
	}
	ghc := github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout)
	_, code, err := ghc.SetEmailVisibility(visibility)
	if err != nil {
		// GitHub 对"设置成当前已有值"返回 422 unchanged，视为成功（幂等）
		var apiErr *github.APIError
		if errors.As(err, &apiErr) && apiErr.Status == 422 && strings.Contains(apiErr.Body, "unchanged") {
			return nil
		}
		return fmt.Errorf("api %d: %w", code, err)
	}
	return nil
}

// ghFor 用账户 token 构造 GitHub 客户端
func (s *AccountService) ghFor(c *Container, id uint) (*github.Client, error) {
	token, _, err := s.GetDecryptedToken(id)
	if err != nil {
		return nil, err
	}
	return github.New(c.CFG.GitHub.APIBaseURL, token, c.CFG.GitHub.RequestTimeout), nil
}

// StarRepo / UnstarRepo / FollowUser / UnfollowUser：以账户身份执行的社交动作
func (s *AccountService) StarRepo(c *Container, id uint, owner, repo string) error {
	ghc, err := s.ghFor(c, id)
	if err != nil {
		return err
	}
	if code, err := ghc.StarRepo(owner, repo); err != nil {
		return fmt.Errorf("api %d: %w", code, err)
	}
	return nil
}

func (s *AccountService) UnstarRepo(c *Container, id uint, owner, repo string) error {
	ghc, err := s.ghFor(c, id)
	if err != nil {
		return err
	}
	if _, err := ghc.UnstarRepo(owner, repo); err != nil {
		return err
	}
	return nil
}

func (s *AccountService) FollowUser(c *Container, id uint, username string) error {
	ghc, err := s.ghFor(c, id)
	if err != nil {
		return err
	}
	if code, err := ghc.FollowUser(username); err != nil {
		return fmt.Errorf("api %d: %w", code, err)
	}
	return nil
}

func (s *AccountService) UnfollowUser(c *Container, id uint, username string) error {
	ghc, err := s.ghFor(c, id)
	if err != nil {
		return err
	}
	if _, err := ghc.UnfollowUser(username); err != nil {
		return err
	}
	return nil
}

// GetStatusHistory 返回账户的状态转换记录（倒序）
func (s *AccountService) GetStatusHistory(c *Container, id uint, limit int) ([]model.StatusChange, error) {
	if limit <= 0 || limit > 500 {
		limit = 100
	}
	var out []model.StatusChange
	err := s.DB.Where("account_id = ?", id).Order("created_at DESC").Limit(limit).Find(&out).Error
	return out, err
}

// StatusFluxSummary 24 小时状态转换统计
type StatusFluxSummary struct {
	ActiveToRestricted  int64 `json:"active_to_restricted"`
	ActiveToBanned      int64 `json:"active_to_banned"`
	RestrictedToActive  int64 `json:"restricted_to_active"`
	BannedToActive      int64 `json:"banned_to_active"`
	ToRestricted        int64 `json:"to_restricted"`
	ToActive            int64 `json:"to_active"`
	Total               int64 `json:"total"`
}

// StatusChangeDetail 转换明细项（带账户登录名）
type StatusChangeDetail struct {
	model.StatusChange
	Login string `json:"login"`
}

// GetStatusFlux24h 统计近 24 小时的状态转换数量（排除 5 分钟新账户窗口：
// 记录生成时已排除，本查询只需按时间聚合）
func (s *AccountService) GetStatusFlux24h(c *Container) (*StatusFluxSummary, error) {
	since := time.Now().Add(-24 * time.Hour)
	var rows []model.StatusChange
	if err := s.DB.Where("created_at >= ?", since).Find(&rows).Error; err != nil {
		return nil, err
	}
	sum := &StatusFluxSummary{}
	sum.Total = int64(len(rows))
	for _, r := range rows {
		if r.FromStatus == "active" && r.ToStatus == "restricted" {
			sum.ActiveToRestricted++
		} else if r.FromStatus == "active" && r.ToStatus == "banned" {
			sum.ActiveToBanned++
		} else if r.FromStatus == "restricted" && r.ToStatus == "active" {
			sum.RestrictedToActive++
		} else if r.FromStatus == "banned" && r.ToStatus == "active" {
			sum.BannedToActive++
		}
		if r.ToStatus == "restricted" {
			sum.ToRestricted++
		}
		if r.ToStatus == "active" {
			sum.ToActive++
		}
	}
	return sum, nil
}

// GetStatusFluxDetails 返回近 24 小时某类转换的明细（带账户登录名，倒序）
func (s *AccountService) GetStatusFluxDetails(c *Container, fromStatus, toStatus string) ([]StatusChangeDetail, error) {
	since := time.Now().Add(-24 * time.Hour)
	q := s.DB.Where("created_at >= ? AND from_status = ? AND to_status = ?", since, fromStatus, toStatus)
	var rows []model.StatusChange
	if err := q.Order("created_at DESC").Limit(500).Find(&rows).Error; err != nil {
		return nil, err
	}
	// 批量取登录名
	ids := make([]uint, 0, len(rows))
	for _, r := range rows {
		ids = append(ids, r.AccountID)
	}
	loginMap := map[uint]string{}
	if len(ids) > 0 {
		var accs []model.Account
		if err := s.DB.Select("id, github_login").Where("id IN ?", ids).Find(&accs).Error; err == nil {
			for _, a := range accs {
				loginMap[a.ID] = a.GithubLogin
			}
		}
	}
	out := make([]StatusChangeDetail, 0, len(rows))
	for _, r := range rows {
		out = append(out, StatusChangeDetail{StatusChange: r, Login: loginMap[r.AccountID]})
	}
	return out, nil
}

// ScheduleRecheck 延迟一段时间后对账户再做一次完整检测。
// 用于导入后的二次复检：新账户信息在 GitHub 侧可能延迟生效，导致导入瞬间的首检偏差。
// 定时器驻留在内存中（进程重启丢失，由周期性自动检测兜底）；账户已进入回收站则跳过。
func (s *AccountService) ScheduleRecheck(c *Container, id uint, delay time.Duration) {
	time.AfterFunc(delay, func() {
		if _, err := s.GetActive(id); err != nil {
			return // 已删除/不存在，跳过
		}
		if acc, err := s.CheckStatus(c, id); err != nil {
			log.Printf("[import] 复检账户 %d 失败: %v", id, err)
		} else {
			log.Printf("[import] 复检账户 %s(id=%d): %s", acc.GithubLogin, id, acc.Status)
		}
	})
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
