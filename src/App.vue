<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import JourneySection from '@/components/sections/JourneySection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

onMounted(() => {
  // Initialize smooth scrolling
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  lenis?.destroy()
  lenis = null
})
</script>

<template>
  <div class="app">
    <TheHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <JourneySection />
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/main';
</style>
