<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md'
})

const buttonRef = ref<HTMLElement | null>(null)
const rippleRef = ref<HTMLSpanElement | null>(null)

const createRipple = (event: MouseEvent) => {
  if (!buttonRef.value || !rippleRef.value) return

  const button = buttonRef.value
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  rippleRef.value.style.width = rippleRef.value.style.height = `${size}px`
  rippleRef.value.style.left = `${x}px`
  rippleRef.value.style.top = `${y}px`
  rippleRef.value.classList.remove('animate')

  void rippleRef.value.offsetWidth
  rippleRef.value.classList.add('animate')
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    ref="buttonRef"
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    @click="createRipple"
  >
    <span class="btn__content">
      <slot />
    </span>
    <span ref="rippleRef" class="btn__ripple" />
  </component>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $space-2;
  font-family: $font-display;
  font-weight: $font-weight-semibold;
  text-decoration: none;
  border-radius: $radius-full;
  cursor: pointer;
  overflow: hidden;
  transition: all $transition-normal;
  @include focus-visible;

  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    pointer-events: none;

    &.animate {
      animation: ripple 0.6s ease-out;
    }
  }

  // Sizes
  &--sm {
    padding: $space-2 $space-4;
    font-size: $font-size-small;
  }

  &--md {
    padding: $space-3 $space-6;
    font-size: $font-size-body;
  }

  &--lg {
    padding: $space-4 $space-8;
    font-size: $font-size-h4;
  }

  // Variants
  &--primary {
    background: $gradient-cta;
    color: $foam-white;
    box-shadow: $shadow-cta;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba($coral-primary, 0.5);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: $gradient-ocean;
    color: $foam-white;
    box-shadow: $shadow-glow;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba($ocean-bright, 0.5);
    }
  }

  &--outline {
    background: transparent;
    color: $foam-white;
    border: 2px solid $ocean-surface;

    &:hover {
      background: rgba($ocean-surface, 0.1);
      border-color: $foam-white;
      transform: translateY(-2px);
    }
  }

  &--ghost {
    background: transparent;
    color: $text-secondary;

    &:hover {
      color: $foam-white;
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
