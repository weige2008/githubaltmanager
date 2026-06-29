<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  duration?: number
}>(), {
  duration: 800
})

const display = ref(0)
const elRef = ref<HTMLElement>()

function animate(from: number, to: number, duration: number) {
  const start = performance.now()
  const step = (now: number) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3)
    display.value = Math.round(from + (to - from) * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  animate(0, props.value, props.duration)
})

watch(() => props.value, (newVal, oldVal) => {
  animate(oldVal || 0, newVal, props.duration)
})
</script>

<template>
  <span ref="elRef" class="count-up">{{ display }}</span>
</template>
