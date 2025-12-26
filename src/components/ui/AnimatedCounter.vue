<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  prefix: '',
  duration: 2000
})

const counterRef = ref<HTMLElement | null>(null)
const displayValue = ref(0)
const hasAnimated = ref(false)

const animateCounter = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const startTime = performance.now()
  const startValue = 0
  const endValue = props.value

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)

    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(startValue + (endValue - startValue) * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

useIntersectionObserver(
  counterRef,
  (entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting) {
      animateCounter()
    }
  },
  { threshold: 0.5 }
)

watch(() => props.value, () => {
  hasAnimated.value = false
  displayValue.value = 0
})
</script>

<template>
  <span ref="counterRef" class="counter">
    <span class="counter__prefix">{{ prefix }}</span>
    <span class="counter__value">{{ displayValue }}</span>
    <span class="counter__suffix">{{ suffix }}</span>
  </span>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.counter {
  display: inline-flex;
  align-items: baseline;
  font-family: $font-display;
  font-weight: $font-weight-bold;

  &__value {
    font-variant-numeric: tabular-nums;
  }

  &__suffix,
  &__prefix {
    font-weight: $font-weight-semibold;
  }
}
</style>
