<script setup lang="ts">
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'Email', icon: 'email', href: 'mailto:info@crafters.com' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__wave">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,40 C360,100 720,0 1080,60 C1260,90 1380,70 1440,80 L1440,120 L0,120 Z"
        />
      </svg>
    </div>

    <div class="footer__content">
      <div class="footer__container">
        <div class="footer__brand">
          <div class="footer__logo">
            <svg viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
              <path d="M10 25 Q20 10 30 25" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M12 28 Q20 18 28 28" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
            </svg>
            <span>Crafters</span>
          </div>
          <p class="footer__tagline">
            Crafting excellence in marine industry for over a decade.
          </p>
        </div>

        <div class="footer__links">
          <h4>Quick Links</h4>
          <a href="#about">About Us</a>
          <a href="#journey">Our Process</a>
          <a href="#contact">Contact</a>
        </div>

        <div class="footer__contact">
          <h4>Get in Touch</h4>
          <p>info@crafters-marine.com</p>
          <p>+1 (555) 123-4567</p>
          <div class="footer__social">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.href"
              :aria-label="link.name"
              class="footer__social-link"
            >
              <svg v-if="link.icon === 'linkedin'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <svg v-else-if="link.icon === 'email'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; {{ currentYear }} Crafters Marine. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.footer {
  position: relative;
  background: $ocean-deep;

  &__wave {
    position: relative;
    height: 80px;
    margin-bottom: -1px;

    svg {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      color: $ocean-deep;
    }
  }

  &__content {
    padding: $space-10 0 $space-6;
  }

  &__container {
    @include container;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: $space-8;

    @include respond-below('md') {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }

  &__brand {
    max-width: 300px;

    @include respond-below('md') {
      max-width: none;
      margin: 0 auto;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-bottom: $space-4;

    @include respond-below('md') {
      justify-content: center;
    }

    svg {
      width: 36px;
      height: 36px;
      color: $ocean-surface;
    }

    span {
      font-family: $font-display;
      font-size: $font-size-h4;
      font-weight: $font-weight-bold;
      color: $foam-white;
    }
  }

  &__tagline {
    color: $text-muted;
    font-size: $font-size-small;
  }

  &__links,
  &__contact {
    h4 {
      color: $ocean-surface;
      font-size: $font-size-body;
      margin-bottom: $space-4;
    }

    a, p {
      display: block;
      color: $text-muted;
      font-size: $font-size-small;
      margin-bottom: $space-2;
      transition: color $transition-fast;
    }

    a:hover {
      color: $foam-white;
    }
  }

  &__social {
    display: flex;
    gap: $space-3;
    margin-top: $space-4;

    @include respond-below('md') {
      justify-content: center;
    }
  }

  &__social-link {
    @include flex-center;
    width: 40px;
    height: 40px;
    background: rgba($ocean-surface, 0.1);
    border-radius: $radius-full;
    color: $ocean-surface;
    transition: all $transition-normal;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: $ocean-surface;
      color: $ocean-deep;
      transform: translateY(-2px);
    }
  }

  &__bottom {
    @include container;
    padding-top: $space-6;
    margin-top: $space-8;
    border-top: 1px solid $border-color;
    text-align: center;

    p {
      color: $text-muted;
      font-size: $font-size-small;
    }
  }
}
</style>
