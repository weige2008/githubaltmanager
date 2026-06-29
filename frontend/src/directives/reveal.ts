/**
 * Vue 自定义指令：滚动渐显
 * 用法：v-reveal 或 v-reveal="{ delay: 200 }"
 */
import type { Directive } from 'vue'

const observerMap = new WeakMap<Element, IntersectionObserver>()

export const vReveal: Directive<HTMLElement, { delay?: number } | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value?.delay) {
      el.style.transitionDelay = binding.value.delay + 'ms'
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    observerMap.set(el, observer)
  },
  unmounted(el) {
    const observer = observerMap.get(el)
    if (observer) {
      observer.disconnect()
      observerMap.delete(el)
    }
  }
}
