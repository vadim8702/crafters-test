<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JourneyTimeline from '@/components/journey/JourneyTimeline.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  // Header animation
  gsap.from('.journey__header', {
    scrollTrigger: {
      trigger: '.journey__header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  // CTA animation
  gsap.from('.journey__cta', {
    scrollTrigger: {
      trigger: '.journey__cta',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  })
})
</script>

<template>
  <section ref="sectionRef" id="journey" class="journey">
    <!-- Wave divider -->
    <div class="journey__wave">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,0 L0,0 Z"
        />
      </svg>
    </div>

    <div class="journey__container">
      <div class="journey__header">
        <span class="journey__label">Our Process</span>
        <h2 class="journey__title">
          Your Journey With
          <span class="text-gradient">Crafters</span>
        </h2>
        <p class="journey__subtitle">
          From first contact to ongoing support, we ensure a seamless experience.
          Here's how we work with our valued customers.
        </p>
      </div>

      <JourneyTimeline />

      <div class="journey__cta">
        <p class="journey__cta-text">
          Ready to start your journey with us?
        </p>
        <BaseButton href="#contact" variant="primary" size="lg">
          Begin Your Project
        </BaseButton>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="journey__decoration journey__decoration--1"></div>
    <div class="journey__decoration journey__decoration--2"></div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.journey {
  position: relative;
  @include section-base;
  background: $ocean-deep;
  padding-top: 0;

  &__wave {
    position: relative;
    margin-bottom: $space-8;

    svg {
      display: block;
      width: 100%;
      height: 80px;
      color: $ocean-dark;
    }
  }

  &__container {
    @include container;
    position: relative;
    z-index: 2;
  }

  &__header {
    text-align: center;
    max-width: 700px;
    margin: 0 auto $space-10;
  }

  &__label {
    display: inline-block;
    color: $ocean-surface;
    font-size: $font-size-small;
    font-weight: $font-weight-semibold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: $space-4;
  }

  &__title {
    font-size: $font-size-h1;
    margin-bottom: $space-4;

    span {
      display: inline;
    }
  }

  &__subtitle {
    color: $text-secondary;
    font-size: $font-size-h4;
    line-height: 1.6;
  }

  &__cta {
    text-align: center;
    margin-top: $space-12;
    padding: $space-8;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-xl;

    &-text {
      font-size: $font-size-h3;
      margin-bottom: $space-6;
      color: $foam-white;
    }
  }

  &__decoration {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;

    &--1 {
      top: 20%;
      right: 5%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba($ocean-bright, 0.08) 0%, transparent 70%);
    }

    &--2 {
      bottom: 10%;
      left: 5%;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba($coral-primary, 0.06) 0%, transparent 70%);
    }
  }
}
</style>
