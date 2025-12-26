<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import WaveBackground from '@/components/ui/WaveBackground.vue'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

onMounted(() => {
  // GSAP Animation Timeline
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero__badge', {
    y: -30,
    opacity: 0,
    duration: 0.8
  })
    .from('.hero__title-line', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15
    }, '-=0.4')
    .from('.hero__subtitle', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, '-=0.3')
    .from('.hero__cta', {
      y: 30,
      opacity: 0,
      duration: 0.6
    }, '-=0.3')
    .from('.hero__scroll', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.2')

  // Parallax on scroll
  gsap.to('.hero__content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 150,
    opacity: 0.3
  })
})
</script>

<template>
  <section ref="heroRef" class="hero">
    <WaveBackground variant="hero" />

    <div class="hero__content">
      <div class="hero__badge">
        <span class="hero__badge-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </span>
        <AnimatedCounter :value="10" suffix="+" :duration="2000" />
        <span class="hero__badge-text">Years of Excellence</span>
      </div>

      <h1 class="hero__title">
        <span class="hero__title-line hero__title-line--gradient">
          Crafting Excellence
        </span>
        <span class="hero__title-line">
          in Marine Industry
        </span>
      </h1>

      <p class="hero__subtitle">
        Premium marine solutions built with precision, expertise, and unwavering
        commitment to quality. From concept to delivery, we're with you every step.
      </p>

      <div class="hero__cta">
        <BaseButton href="#journey" variant="primary" size="lg">
          Discover Our Process
        </BaseButton>
        <BaseButton href="#contact" variant="outline" size="lg">
          Start a Project
        </BaseButton>
      </div>
    </div>

    <a href="#about" class="hero__scroll">
      <span>Scroll to Explore</span>
      <div class="hero__scroll-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </a>

    <!-- Decorative elements -->
    <div class="hero__decoration hero__decoration--1"></div>
    <div class="hero__decoration hero__decoration--2"></div>
    <div class="hero__decoration hero__decoration--3"></div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $space-12 $section-padding-x;
  overflow: hidden;

  &__content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 900px;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 $space-5;
    @include glass(0.1);
    border-radius: $radius-full;
    margin-bottom: $space-6;
    animation: pulse-glow 3s ease-in-out infinite;

    &-icon {
      color: $gold-accent;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    :deep(.counter) {
      font-size: $font-size-h3;
      color: $ocean-surface;
    }

    &-text {
      color: $text-secondary;
      font-size: $font-size-small;
      font-weight: $font-weight-medium;
    }
  }

  &__title {
    margin-bottom: $space-6;

    &-line {
      display: block;
      font-size: $font-size-hero;
      font-weight: $font-weight-bold;
      line-height: 1.1;
      letter-spacing: -0.03em;

      &--gradient {
        @include gradient-text($gradient-text);
      }
    }
  }

  &__subtitle {
    max-width: 600px;
    margin: 0 auto $space-8;
    font-size: $font-size-h4;
    color: $text-secondary;
    line-height: 1.6;
  }

  &__cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-4;
  }

  &__scroll {
    position: absolute;
    bottom: $space-8;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-2;
    color: $text-muted;
    text-decoration: none;
    font-size: $font-size-small;
    transition: color $transition-fast;

    &:hover {
      color: $ocean-surface;

      .hero__scroll-icon {
        transform: translateY(5px);
      }
    }

    &-icon {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: bounce 2s ease-in-out infinite;
      transition: transform $transition-normal;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  // Decorative floating elements
  &__decoration {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--1 {
      top: 15%;
      right: 10%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba($ocean-surface, 0.15) 0%, transparent 70%);
      animation: float 8s ease-in-out infinite;
    }

    &--2 {
      bottom: 20%;
      left: 5%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba($coral-primary, 0.1) 0%, transparent 70%);
      animation: float 6s ease-in-out infinite reverse;
    }

    &--3 {
      top: 40%;
      left: 15%;
      width: 150px;
      height: 150px;
      background: radial-gradient(circle, rgba($gold-accent, 0.1) 0%, transparent 70%);
      animation: float 10s ease-in-out infinite;
      animation-delay: -2s;
    }
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba($ocean-surface, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba($ocean-surface, 0.4);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(20px) translateX(10px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

@include respond-below('md') {
  .hero {
    padding: $space-10 $section-padding-x $space-12;

    &__badge {
      flex-wrap: wrap;
      justify-content: center;
    }

    &__title-line {
      font-size: clamp(2rem, 8vw, 3.5rem);
    }

    &__subtitle {
      font-size: $font-size-body;
    }

    &__cta {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
