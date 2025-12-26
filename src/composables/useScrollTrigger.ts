import { onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollTrigger() {
  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })

  const createScrollAnimation = (
    target: string | Element,
    animation: gsap.TweenVars,
    triggerOptions: ScrollTrigger.Vars = {}
  ) => {
    return gsap.to(target, {
      ...animation,
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...triggerOptions
      }
    })
  }

  const createStaggerAnimation = (
    targets: string | Element[],
    animation: gsap.TweenVars,
    staggerAmount: number = 0.1,
    triggerOptions: ScrollTrigger.Vars = {}
  ) => {
    return gsap.to(targets, {
      ...animation,
      stagger: staggerAmount,
      scrollTrigger: {
        trigger: typeof targets === 'string' ? targets : targets[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...triggerOptions
      }
    })
  }

  const createTimeline = (triggerOptions: ScrollTrigger.Vars = {}) => {
    return gsap.timeline({
      scrollTrigger: {
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...triggerOptions
      }
    })
  }

  const fadeInUp = (target: string | Element, delay: number = 0) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  const scaleIn = (target: string | Element, delay: number = 0) => {
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: target,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  return {
    gsap,
    ScrollTrigger,
    createScrollAnimation,
    createStaggerAnimation,
    createTimeline,
    fadeInUp,
    scaleIn
  }
}

export function useGsap() {
  return { gsap, ScrollTrigger }
}
