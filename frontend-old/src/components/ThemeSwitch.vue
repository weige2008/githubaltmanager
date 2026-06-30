<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const theme = useThemeStore()
</script>

<template>
  <div class="theme-switch" @click="theme.toggle()" :title="theme.theme === 'fluent' ? '切换到 Glassmorphism' : '切换到 Fluent 2'">
    <div class="track" :class="{ glass: theme.theme === 'glass' }">
      <div class="thumb">
        <span v-if="theme.theme === 'fluent'" class="label">Fluent</span>
        <span v-else class="label">Glass</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme-switch { cursor: pointer; display: inline-flex; align-items: center; }

.track {
  width: 76px; height: 28px;
  border-radius: 100px;
  background: var(--surface-2);
  border: 1px solid var(--surface-border);
  position: relative;
  transition: background 0.25s ease;
  &.glass {
    background: rgba(76, 194, 255, 0.1);
    border-color: rgba(76, 194, 255, 0.3);
  }
}

.thumb {
  position: absolute;
  top: 2px; left: 2px;
  width: 56px; height: 22px;
  border-radius: 100px;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.track.glass .thumb {
  transform: translateX(14px);
}

.label {
  font-size: 10px; font-weight: 700; color: #fff; letter-spacing: 0.3px;
}
</style>
