<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BaseButton from '@/components/ui/BaseButton.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)

const formData = ref({
  name: '',
  email: '',
  company: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))

  isSubmitting.value = false
  isSubmitted.value = true

  // Reset after showing success
  setTimeout(() => {
    formData.value = { name: '', email: '', company: '', message: '' }
    isSubmitted.value = false
  }, 3000)
}

const contactInfo = [
  {
    icon: 'email',
    label: 'Email',
    value: 'info@crafters-marine.com',
    href: 'mailto:info@crafters-marine.com'
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: 'location',
    label: 'Location',
    value: 'Marine District, Harbor City',
    href: '#'
  }
]

onMounted(() => {
  if (!sectionRef.value) return

  gsap.from('.contact__header', {
    scrollTrigger: {
      trigger: '.contact__header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.contact__form', {
    scrollTrigger: {
      trigger: '.contact__form',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.contact__info', {
    scrollTrigger: {
      trigger: '.contact__info',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })

  gsap.from('.contact__info-item', {
    scrollTrigger: {
      trigger: '.contact__info',
      start: 'top 80%',
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
  <section ref="sectionRef" id="contact" class="contact">
    <!-- Wave divider -->
    <div class="contact__wave">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,50 1440,30 L1440,0 L0,0 Z"
        />
      </svg>
    </div>

    <div class="contact__container">
      <div class="contact__header">
        <span class="contact__label">Get in Touch</span>
        <h2 class="contact__title">
          Start Your
          <span class="text-gradient">Project Today</span>
        </h2>
        <p class="contact__subtitle">
          Have a marine project in mind? We'd love to hear about it.
          Reach out and let's craft something exceptional together.
        </p>
      </div>

      <div class="contact__grid">
        <form ref="formRef" class="contact__form" @submit.prevent="handleSubmit">
          <div v-if="isSubmitted" class="contact__success">
            <div class="contact__success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
            </div>
            <h3>Message Sent!</h3>
            <p>We'll get back to you within 24 hours.</p>
          </div>

          <template v-else>
            <div class="contact__field">
              <input
                v-model="formData.name"
                type="text"
                id="name"
                required
                placeholder=" "
              />
              <label for="name">Your Name</label>
            </div>

            <div class="contact__field">
              <input
                v-model="formData.email"
                type="email"
                id="email"
                required
                placeholder=" "
              />
              <label for="email">Email Address</label>
            </div>

            <div class="contact__field">
              <input
                v-model="formData.company"
                type="text"
                id="company"
                placeholder=" "
              />
              <label for="company">Company (Optional)</label>
            </div>

            <div class="contact__field contact__field--textarea">
              <textarea
                v-model="formData.message"
                id="message"
                rows="4"
                required
                placeholder=" "
              ></textarea>
              <label for="message">Tell us about your project</label>
            </div>

            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :class="{ 'btn--loading': isSubmitting }"
            >
              <span v-if="isSubmitting" class="contact__spinner"></span>
              <span v-else>Send Message</span>
            </BaseButton>
          </template>
        </form>

        <div class="contact__info">
          <div class="contact__info-card">
            <h3>Let's Talk</h3>
            <p>
              Whether you have a specific project in mind or just want to explore
              possibilities, our team is ready to help.
            </p>

            <div class="contact__info-list">
              <a
                v-for="item in contactInfo"
                :key="item.label"
                :href="item.href"
                class="contact__info-item"
              >
                <div class="contact__info-icon">
                  <svg v-if="item.icon === 'email'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 8l9 6 9-6"/>
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                  </svg>
                  <svg v-else-if="item.icon === 'phone'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="contact__info-content">
                  <span class="contact__info-label">{{ item.label }}</span>
                  <span class="contact__info-value">{{ item.value }}</span>
                </div>
              </a>
            </div>
          </div>

          <div class="contact__hours">
            <h4>Business Hours</h4>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.contact {
  position: relative;
  @include section-base;
  background: $ocean-dark;
  padding-top: 0;

  &__wave {
    position: relative;
    margin-bottom: $space-8;

    svg {
      display: block;
      width: 100%;
      height: 80px;
      color: $ocean-deep;
    }
  }

  &__container {
    @include container;
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
  }

  &__subtitle {
    color: $text-secondary;
    font-size: $font-size-h4;
    line-height: 1.6;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-10;

    @include respond-below('lg') {
      grid-template-columns: 1fr;
    }
  }

  &__form {
    padding: $space-8;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-xl;
  }

  &__success {
    text-align: center;
    padding: $space-8 0;

    &-icon {
      @include flex-center;
      width: 80px;
      height: 80px;
      margin: 0 auto $space-4;
      background: $gradient-ocean;
      border-radius: 50%;
      color: $foam-white;

      svg {
        width: 40px;
        height: 40px;
      }
    }

    h3 {
      font-size: $font-size-h3;
      margin-bottom: $space-2;
    }

    p {
      color: $text-secondary;
    }
  }

  &__field {
    position: relative;
    margin-bottom: $space-5;

    input,
    textarea {
      width: 100%;
      padding: $space-4;
      padding-top: $space-6;
      background: rgba($ocean-deep, 0.5);
      border: 1px solid $border-color;
      border-radius: $radius-md;
      color: $foam-white;
      font-family: $font-body;
      font-size: $font-size-body;
      transition: all $transition-normal;

      &:focus {
        outline: none;
        border-color: $ocean-surface;
        box-shadow: 0 0 0 3px rgba($ocean-surface, 0.2);
      }

      &:focus + label,
      &:not(:placeholder-shown) + label {
        top: $space-2;
        font-size: $font-size-small;
        color: $ocean-surface;
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    label {
      position: absolute;
      left: $space-4;
      top: 50%;
      transform: translateY(-50%);
      color: $text-muted;
      font-size: $font-size-body;
      pointer-events: none;
      transition: all $transition-normal;
    }

    &--textarea label {
      top: $space-6;
      transform: none;
    }
  }

  &__spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top-color: $foam-white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__info-card {
    padding: $space-6;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-xl;

    h3 {
      font-size: $font-size-h3;
      margin-bottom: $space-3;
    }

    > p {
      color: $text-secondary;
      line-height: 1.6;
      margin-bottom: $space-6;
    }
  }

  &__info-list {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__info-item {
    display: flex;
    align-items: center;
    gap: $space-4;
    padding: $space-4;
    background: rgba($ocean-deep, 0.3);
    border-radius: $radius-lg;
    text-decoration: none;
    transition: all $transition-normal;

    &:hover {
      background: rgba($ocean-surface, 0.1);
      transform: translateX(5px);
    }
  }

  &__info-icon {
    @include flex-center;
    width: 48px;
    height: 48px;
    background: $gradient-ocean;
    border-radius: $radius-md;
    color: $foam-white;
    flex-shrink: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &__info-content {
    display: flex;
    flex-direction: column;
  }

  &__info-label {
    font-size: $font-size-small;
    color: $text-muted;
  }

  &__info-value {
    color: $foam-white;
    font-weight: $font-weight-medium;
  }

  &__hours {
    padding: $space-6;
    background: $glass-bg;
    border: 1px solid $glass-border;
    border-radius: $radius-xl;

    h4 {
      font-size: $font-size-h4;
      margin-bottom: $space-3;
      color: $ocean-surface;
    }

    p {
      color: $text-secondary;
      font-size: $font-size-small;
      margin-bottom: $space-1;
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
