<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="nf-page">
    <div class="nf-card glass-card anim-fade-scale">
      <div class="nf-code">404</div>
      <h2>页面走丢了</h2>
      <p>你访问的页面不存在。</p>
      <div class="nf-actions">
        <el-button type="primary" round @click="router.push('/')">返回主页</el-button>
        <el-button round @click="router.push('/dashboard')">控制台</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nf-page {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
}
.nf-card { padding: 48px 56px; text-align: center; border-radius: var(--radius-lg); }
.nf-code {
  font-size: 72px; font-weight: 800; line-height: 1;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
h2 { font-size: 22px; font-weight: 700; margin: 10px 0 6px; color: var(--text-primary); }
p { color: var(--text-secondary); margin: 0 0 24px; }
.nf-actions { display: flex; gap: 12px; justify-content: center; }
</style>
