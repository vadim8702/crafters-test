<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journeySteps } from '@/data/journeySteps'
import JourneyStep from './JourneyStep.vue'

gsap.registerPlugin(ScrollTrigger)

const timelineRef = ref<HTMLElement | null>(null)
const activeStep = ref(0)
const scrollProgress = ref(0)

onMounted(() => {
  if (!timelineRef.value) return

  // Main timeline scroll trigger
  ScrollTrigger.create({
    trigger: timelineRef.value,
    start: 'top 20%',
    end: 'bottom 80%',
    scrub: 0.5,
    onUpdate: (self) => {
      scrollProgress.value = self.progress
      activeStep.value = Math.min(
        Math.floor(self.progress * journeySteps.length),
        journeySteps.length - 1
      )
    }
  })

  // Animate each step on scroll
  const steps = timelineRef.value.querySelectorAll('.journey-timeline__step')
  steps.forEach((step, index) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.05,
      ease: 'power3.out'
    })
  })

  // Path drawing animation
  const path = timelineRef.value.querySelector('.journey-timeline__path-line')
  if (path) {
    const length = (path as SVGPathElement).getTotalLength()
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    })

    gsap.to(path, {
      scrollTrigger: {
        trigger: timelineRef.value,
        start: 'top 40%',
        end: 'bottom 60%',
        scrub: 1
      },
      strokeDashoffset: 0,
      ease: 'none'
    })
  }
})
</script>

<template>
  <div ref="timelineRef" class="journey-timeline">
    <!-- Progress indicator -->
    <div class="journey-timeline__progress">
      <div
        class="journey-timeline__progress-bar"
        :style="{ height: `${scrollProgress * 100}%` }"
      />
      <div
        v-for="(step, index) in journeySteps"
        :key="step.id"
        :class="['journey-timeline__progress-dot', { 'journey-timeline__progress-dot--active': index <= activeStep }]"
        :style="{ top: `${(index / (journeySteps.length - 1)) * 100}%` }"
      />
    </div>

    <!-- SVG Path -->
    <svg class="journey-timeline__path" viewBox="0 0 100 1100" preserveAspectRatio="none">
      <path
        class="journey-timeline__path-line"
        d="M50 0
           Q80 50 50 100
           Q20 150 50 200
           Q80 250 50 300
           Q20 350 50 400
           Q80 450 50 500
           Q20 550 50 600
           Q80 650 50 700
           Q20 750 50 800
           Q80 850 50 900
           Q20 950 50 1000
           Q80 1050 50 1100"
        fill="none"
        stroke="url(#pathGradient)"
        stroke-width="2"
      />
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4BC7CF" />
          <stop offset="50%" stop-color="#0077BE" />
          <stop offset="100%" stop-color="#FF6B35" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Steps Grid -->
    <div class="journey-timeline__grid">
      <div
        v-for="(step, index) in journeySteps"
        :key="step.id"
        :class="['journey-timeline__step', { 'journey-timeline__step--left': index % 2 === 0 }]"
      >
        <JourneyStep
          :step="step"
          :index="index"
          :is-active="index <= activeStep"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.journey-timeline {
  position: relative;
  padding: $space-8 0;

  &__progress {
    position: fixed;
    left: $space-6;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 200px;
    background: rgba($ocean-mid, 0.3);
    border-radius: $radius-full;
    z-index: $z-fixed;
    display: none;

    @include respond-to('lg') {
      display: block;
    }

    &-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: $gradient-ocean;
      border-radius: $radius-full;
      transition: height 0.1s ease-out;
    }

    &-dot {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      background: $ocean-dark;
      border: 2px solid $ocean-mid;
      border-radius: 50%;
      transition: all $transition-normal;

      &--active {
        background: $ocean-surface;
        border-color: $ocean-surface;
        box-shadow: 0 0 10px rgba($ocean-surface, 0.5);
      }
    }
  }

  &__path {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100px;
    height: 100%;
    pointer-events: none;
    z-index: 1;

    @include respond-below('lg') {
      left: 30px;
      transform: none;
    }

    @include respond-below('md') {
      display: none;
    }
  }

  &__path-line {
    stroke-linecap: round;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-6 $space-12;
    position: relative;
    z-index: 2;

    @include respond-below('lg') {
      grid-template-columns: 1fr;
      padding-left: $space-10;
    }

    @include respond-below('md') {
      padding-left: 0;
    }
  }

  &__step {
    &--left {
      justify-self: end;
      padding-right: $space-10;

      @include respond-below('lg') {
        justify-self: start;
        padding-right: 0;
      }
    }

    &:not(&--left) {
      justify-self: start;
      padding-left: $space-10;
      grid-column: 2;

      @include respond-below('lg') {
        grid-column: 1;
        padding-left: 0;
      }
    }
  }
}
</style>
