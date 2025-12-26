<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Our Process', href: '#journey' },
  { label: 'Contact', href: '#contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header :class="['header', { 'header--scrolled': isScrolled }]">
    <div class="header__container">
      <a href="#" class="header__logo" @click.prevent="closeMobileMenu">
        <svg class="header__logo-icon" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
          <path d="M10 25 Q20 10 30 25" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M12 28 Q20 18 28 28" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
        </svg>
        <span class="header__logo-text">Crafters</span>
      </a>

      <nav :class="['header__nav', { 'header__nav--open': isMobileMenuOpen }]">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="header__link"
          @click="closeMobileMenu"
        >
          {{ link.label }}
        </a>
        <BaseButton href="#contact" size="sm" class="header__cta">
          Get in Touch
        </BaseButton>
      </nav>

      <button
        class="header__mobile-toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <span :class="['header__hamburger', { 'header__hamburger--open': isMobileMenuOpen }]">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  padding: $space-4 0;
  transition: all $transition-normal;

  &--scrolled {
    @include glass(0.1);
    padding: $space-3 0;
    box-shadow: $shadow-md;
  }

  &__container {
    @include container;
    @include flex-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $space-3;
    text-decoration: none;
    color: $foam-white;
    transition: transform $transition-fast;

    &:hover {
      transform: scale(1.02);
    }
  }

  &__logo-icon {
    width: 40px;
    height: 40px;
    color: $ocean-surface;
  }

  &__logo-text {
    font-family: $font-display;
    font-size: $font-size-h4;
    font-weight: $font-weight-bold;
    letter-spacing: -0.02em;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: $space-6;

    @include respond-below('md') {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 280px;
      flex-direction: column;
      justify-content: center;
      gap: $space-6;
      background: $ocean-deep;
      transform: translateX(100%);
      transition: transform $transition-normal;

      &--open {
        transform: translateX(0);
      }
    }
  }

  &__link {
    position: relative;
    color: $text-secondary;
    font-weight: $font-weight-medium;
    text-decoration: none;
    transition: color $transition-fast;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: $ocean-surface;
      transition: width $transition-normal;
    }

    &:hover {
      color: $foam-white;

      &::after {
        width: 100%;
      }
    }

    @include respond-below('md') {
      font-size: $font-size-h4;
    }
  }

  &__cta {
    @include respond-below('md') {
      margin-top: $space-4;
    }
  }

  &__mobile-toggle {
    display: none;
    @include button-reset;
    z-index: $z-fixed + 1;

    @include respond-below('md') {
      display: block;
    }
  }

  &__hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 28px;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: $foam-white;
      transition: all $transition-normal;
    }

    &--open {
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  }
}
</style>
