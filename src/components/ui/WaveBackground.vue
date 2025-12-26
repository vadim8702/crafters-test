<script setup lang="ts">
interface Props {
  variant?: 'hero' | 'section' | 'footer'
}

withDefaults(defineProps<Props>(), {
  variant: 'hero'
})
</script>

<template>
  <div :class="['wave-bg', `wave-bg--${variant}`]">
    <svg
      class="wave-bg__wave wave-bg__wave--1"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
    <svg
      class="wave-bg__wave wave-bg__wave--2"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,106.7C672,117,768,171,864,181.3C960,192,1056,160,1152,133.3C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>
    <svg
      class="wave-bg__wave wave-bg__wave--3"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="currentColor"
        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
    </svg>

    <!-- Floating bubbles -->
    <div class="wave-bg__bubbles">
      <span v-for="i in 15" :key="i" class="bubble" :style="{
        '--delay': `${Math.random() * 10}s`,
        '--duration': `${8 + Math.random() * 10}s`,
        '--size': `${10 + Math.random() * 30}px`,
        '--left': `${Math.random() * 100}%`
      }" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;

.wave-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;

  &--hero {
    background: $gradient-hero;
  }

  &--section {
    background: $ocean-dark;
  }

  &--footer {
    background: $ocean-deep;
  }

  &__wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    min-height: 200px;

    &--1 {
      color: rgba($ocean-mid, 0.3);
      animation: wave-move 12s ease-in-out infinite;
    }

    &--2 {
      color: rgba($ocean-bright, 0.2);
      animation: wave-move 10s ease-in-out infinite reverse;
      animation-delay: -2s;
    }

    &--3 {
      color: rgba($ocean-surface, 0.15);
      animation: wave-move 8s ease-in-out infinite;
      animation-delay: -4s;
    }
  }

  &__bubbles {
    position: absolute;
    inset: 0;

    .bubble {
      position: absolute;
      bottom: -50px;
      left: var(--left);
      width: var(--size);
      height: var(--size);
      background: radial-gradient(
        circle at 30% 30%,
        rgba($ocean-surface, 0.4),
        rgba($ocean-bright, 0.1)
      );
      border-radius: 50%;
      animation: bubble-rise var(--duration) ease-in infinite;
      animation-delay: var(--delay);
    }
  }
}

@keyframes wave-move {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(-2%) translateY(5px);
  }
  50% {
    transform: translateX(0) translateY(-5px);
  }
  75% {
    transform: translateX(2%) translateY(3px);
  }
}

@keyframes bubble-rise {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
    transform: translateY(-10vh) scale(1);
  }
  90% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-110vh) scale(0.8);
    opacity: 0;
  }
}
</style>
