<script setup lang="ts">
import type { JourneyStep } from '@/data/journeySteps'

interface Props {
  step: JourneyStep
  index: number
  isActive?: boolean
}

defineProps<Props>()
</script>

<template>
  <div :class="['journey-step', { 'journey-step--active': isActive }]">
    <div class="journey-step__number">{{ String(index + 1).padStart(2, '0') }}</div>

    <div class="journey-step__icon">
      <!-- Envelope -->
      <svg v-if="step.icon === 'envelope'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 8l9 6 9-6"/>
        <rect x="3" y="5" width="18" height="14" rx="2"/>
      </svg>
      <!-- Search -->
      <svg v-else-if="step.icon === 'search'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="11" cy="11" r="7"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <!-- Document -->
      <svg v-else-if="step.icon === 'document'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="8" y1="17" x2="16" y2="17"/>
      </svg>
      <!-- Settings -->
      <svg v-else-if="step.icon === 'settings'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
      <!-- Check -->
      <svg v-else-if="step.icon === 'check'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
        <polyline points="22,4 12,14.01 9,11.01"/>
      </svg>
      <!-- Rocket -->
      <svg v-else-if="step.icon === 'rocket'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
      <!-- Chart -->
      <svg v-else-if="step.icon === 'chart'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M8 17V11M12 17V7M16 17v-4"/>
      </svg>
      <!-- Cube -->
      <svg v-else-if="step.icon === 'cube'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
      <!-- Truck -->
      <svg v-else-if="step.icon === 'truck'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16,8 20,8 23,11 23,16 16,16"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
      <!-- Smile -->
      <svg v-else-if="step.icon === 'smile'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
      <!-- Support -->
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
      </svg>
    </div>

    <div class="journey-step__content">
      <h3 class="journey-step__title">{{ step.title }}</h3>
      <p class="journey-step__description">{{ step.description }}</p>
    </div>

    <div class="journey-step__glow"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.journey-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: $space-6;
  background: $glass-bg;
  border: 1px solid $glass-border;
  border-radius: $radius-xl;
  transition: all $transition-slow;
  opacity: 0.6;
  transform: scale(0.95);

  &--active {
    opacity: 1;
    transform: scale(1);
    border-color: rgba($ocean-surface, 0.5);
    background: rgba($ocean-surface, 0.05);

    .journey-step__icon {
      background: $gradient-ocean;
      animation: pulse-glow 2s ease-in-out infinite;
    }

    .journey-step__number {
      color: $ocean-surface;
    }

    .journey-step__glow {
      opacity: 1;
    }
  }

  &__number {
    position: absolute;
    top: $space-3;
    right: $space-4;
    font-family: $font-display;
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    color: $text-muted;
    transition: color $transition-normal;
  }

  &__icon {
    @include flex-center;
    width: 72px;
    height: 72px;
    margin-bottom: $space-4;
    background: rgba($ocean-mid, 0.3);
    border-radius: $radius-lg;
    color: $foam-white;
    transition: all $transition-normal;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: $font-size-h4;
    font-weight: $font-weight-semibold;
    margin-bottom: $space-2;
    color: $foam-white;
  }

  &__description {
    font-size: $font-size-small;
    color: $text-muted;
    line-height: 1.6;
  }

  &__glow {
    position: absolute;
    inset: -2px;
    background: $gradient-ocean;
    border-radius: $radius-xl;
    opacity: 0;
    z-index: -1;
    filter: blur(20px);
    transition: opacity $transition-slow;
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba($ocean-surface, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba($ocean-surface, 0.6);
  }
}
</style>
