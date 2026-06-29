<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="not-found">
    <div class="bg-orb"></div>
    <div class="content glass-card">
      <div class="code">404</div>
      <h2>页面走丢了</h2>
      <p>你访问的页面不存在，或已被移动。</p>
      <div class="actions">
        <el-button type="primary" round @click="router.push('/')">返回主页</el-button>
        <el-button round @click="router.push('/app/dashboard')">进入控制台</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.bg-orb {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 120, 212, 0.25), transparent 70%);
  filter: blur(80px);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  pointer-events: none;
}
.content {
  position: relative; z-index: 2;
  padding: 56px 60px;
  text-align: center;
  border-radius: var(--radius-xl);
}
.code {
  font-size: 88px; font-weight: 800; line-height: 1;
  background: linear-gradient(135deg, #0078d4, #4cc2ff);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -3px; margin-bottom: 12px;
}
h2 { font-size: 24px; font-weight: 700; margin: 0 0 8px; }
p { color: var(--text-secondary); margin: 0 0 28px; }
.actions { display: flex; gap: 12px; justify-content: center; }
</style>
