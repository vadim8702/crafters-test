<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedCounter from '@/components/ui/AnimatedCounter.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' }
]

const services = [
  {
    icon: 'ship',
    title: 'Marine Construction',
    description: 'Building vessels and marine structures with precision engineering'
  },
  {
    icon: 'tools',
    title: 'Repair & Maintenance',
    description: 'Comprehensive repair services to keep your fleet in top condition'
  },
  {
    icon: 'compass',
    title: 'Custom Solutions',
    description: 'Tailored marine solutions designed to meet your specific needs'
  }
]

onMounted(() => {
  if (!sectionRef.value) return

  // Animate content on scroll
  gsap.from('.about__content', {
    scrollTrigger: {
      trigger: '.about__content',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.about__visual', {
    scrollTrigger: {
      trigger: '.about__visual',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  // Stagger service cards
  gsap.from('.about__service', {
    scrollTrigger: {
      trigger: '.about__services',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  })

  // Stats animation
  gsap.from('.about__stat', {
    scrollTrigger: {
      trigger: '.about__stats',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  })
})
</script>

<template>
  <section ref="sectionRef" id="about" class="about">
    <div class="about__container">
      <div class="about__grid">
        <div class="about__content">
          <span class="about__label">About Us</span>
          <h2 class="about__title">
            Expertise Forged Through
            <span class="text-gradient">Decades of Excellence</span>
          </h2>
          <p class="about__text">
            With over a decade of experience in the marine industry, Crafters has
            established itself as a trusted partner for businesses seeking premium
            marine solutions. Our team of skilled craftsmen and engineers combines
            traditional craftsmanship with modern technology to deliver exceptional
            results.
          </p>
          <p class="about__text">
            We take pride in our transparent approach, keeping you informed at every
            stage of your project. From initial inquiry to final delivery and beyond,
            we're committed to your complete satisfaction.
          </p>
        </div>

        <div class="about__visual">
          <div class="about__image-wrapper">
            <div class="about__image-placeholder">
              <svg viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="1" opacity="0.3"/>
                <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="1" opacity="0.5"/>
                <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="1" opacity="0.7"/>
                <path d="M60 120 Q100 60 140 120" stroke="currentColor" stroke-width="3" fill="none"/>
                <path d="M70 130 Q100 80 130 130" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
              </svg>
            </div>
            <div class="about__image-decoration about__image-decoration--1"></div>
            <div class="about__image-decoration about__image-decoration--2"></div>
          </div>
        </div>
      </div>

      <div class="about__stats">
        <div v-for="stat in stats" :key="stat.label" class="about__stat">
          <div class="about__stat-value">
            <AnimatedCounter :value="stat.value" :suffix="stat.suffix" :duration="2500" />
          </div>
          <div class="about__stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <div class="about__services">
        <div v-for="service in services" :key="service.title" class="about__service">
          <div class="about__service-icon">
            <svg v-if="service.icon === 'ship'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M3 17l1.5-3.5h15L21 17M5.5 13.5V8a2 2 0 012-2h9a2 2 0 012 2v5.5M12 6V3M8.5 6L9 3M15.5 6L15 3"/>
              <path d="M2 20s2-1 5-1 5 2 10 1 5-1 5-1"/>
            </svg>
            <svg v-else-if="service.icon === 'tools'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h3 class="about__service-title">{{ service.title }}</h3>
          <p class="about__service-desc">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.about {
  @include section-base;
  background: $ocean-dark;

  &__container {
    @include container;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-10;
    align-items: center;
    margin-bottom: $space-12;

    @include respond-below('lg') {
      grid-template-columns: 1fr;
      gap: $space-8;
    }
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
    margin-bottom: $space-6;
    line-height: 1.2;

    span {
      display: block;
    }
  }

  &__text {
    color: $text-secondary;
    margin-bottom: $space-4;
    line-height: 1.8;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__visual {
    @include respond-below('lg') {
      order: -1;
    }
  }

  &__image-wrapper {
    position: relative;
    aspect-ratio: 1;
    max-width: 450px;
    margin: 0 auto;
  }

  &__image-placeholder {
    @include flex-center;
    width: 100%;
    height: 100%;
    background: $gradient-ocean;
    border-radius: $radius-2xl;
    color: $foam-white;
    animation: float 6s ease-in-out infinite;

    svg {
      width: 80%;
      height: 80%;
    }
  }

  &__image-decoration {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    &--1 {
      top: -20px;
      right: -20px;
      width: 100px;
      height: 100px;
      background: rgba($coral-primary, 0.2);
      animation: float 5s ease-in-out infinite reverse;
    }

    &--2 {
      bottom: -10px;
      left: -30px;
      width: 80px;
      height: 80px;
      background: rgba($gold-accent, 0.2);
      animation: float 7s ease-in-out infinite;
    }
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-6;
    padding: $space-8;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-xl;
    margin-bottom: $space-12;

    @include respond-below('md') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-below('sm') {
      grid-template-columns: 1fr;
    }
  }

  &__stat {
    text-align: center;

    &-value {
      font-size: $font-size-h1;
      font-weight: $font-weight-bold;
      @include gradient-text;
      margin-bottom: $space-2;

      :deep(.counter) {
        font-size: inherit;
      }
    }

    &-label {
      color: $text-muted;
      font-size: $font-size-small;
    }
  }

  &__services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-6;

    @include respond-below('md') {
      grid-template-columns: 1fr;
    }
  }

  &__service {
    padding: $space-6;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-lg;
    text-align: center;
    transition: all $transition-normal;

    &:hover {
      transform: translateY(-5px);
      background: rgba($ocean-surface, 0.05);
      border-color: rgba($ocean-surface, 0.3);
    }

    &-icon {
      @include flex-center;
      width: 64px;
      height: 64px;
      margin: 0 auto $space-4;
      background: $gradient-ocean;
      border-radius: $radius-lg;
      color: $foam-white;

      svg {
        width: 32px;
        height: 32px;
      }
    }

    &-title {
      font-size: $font-size-h4;
      margin-bottom: $space-3;
    }

    &-desc {
      color: $text-muted;
      font-size: $font-size-small;
      line-height: 1.6;
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
