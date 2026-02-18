<template>
  <div class="mobile-nav-status-wrapper">
    <div class="hamburger" @click="toggleCollapse">
      <HamburgerButton :isOpen="!isCollapsed" />
    </div>
    <div class="status-theme-controls show-mobile">
      <ThemeToggle class="theme-toggle-mobile" />
      <Status v-if="doorStatus" :doorStatus="doorStatus" />
    </div>
  </div>
  <nav :class="isCollapsed ? 'collapsed' : ''">
    <a class="logo" href="/">Munich Maker Lab</a>
    <div class="links">
      <a v-for="link in links" :key="link.path" :href="link.path">{{ link.name }}</a>
      <div class="show-desktop">
        <Status v-if="doorStatus" :doorStatus="doorStatus" />
      </div>
      <ThemeToggle class="theme-toggle show-desktop" />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Status from './Status.vue';
import ThemeToggle from './ThemeToggle.vue';
import HamburgerButton from './HamburgerButton.vue';
import { getRelativeLocaleUrl } from 'astro:i18n';

const props = defineProps({
  locale: {
    type: String,
    required: true,
  },
});

const doorStatus = ref(null);

onMounted(async () => {
  const res = await fetch('https://status.munichmakerlab.de/api.php');
  doorStatus.value = await res.json();
});

const links = [
  {
    name: 'Home',
    path: `${getRelativeLocaleUrl(props.locale, '/')}`,
  },
  {
    name: 'About',
    path: `${getRelativeLocaleUrl(props.locale, '/about')}`,
  },
  {
    name: 'Visit',
    path: `${getRelativeLocaleUrl(props.locale, '/visit')}`,
  },
  {
    name: 'Contact',
    path: `${getRelativeLocaleUrl(props.locale, '/contact')}`,
  },
  {
    name: 'Events',
    path: `${getRelativeLocaleUrl(props.locale, '/events/')}`,
  },
  {
    name: 'Wiki',
    path: 'https://wiki.munichmakerlab.de/',
  },
];

const isCollapsed = ref(true);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
/* Mobile Menu */
@media (max-width: 950px) {
  .hamburger {
    display: block;
    height: 2rem;
    width: 2rem;
  }

  .logo {
    font-weight: bolder;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  a {
    text-decoration: none;
    padding-bottom: 2rem;
    border-bottom: 1px solid #aaa;
  }

  nav.collapsed {
    display: none;
  }

  .show-desktop {
    display: none;
  }

  .mobile-nav-status-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-theme-controls {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .theme-toggle-mobile {
    color: var(--fg);
    margin-right: 4px;
  }
}

/* Desktop Menu */
@media (min-width: 951px) {
  .hamburger {
    display: none;
  }

  .show-mobile {
    display: none;
  }

  nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    color: white;
    padding: 1.5rem;
    font-weight: 800;
    text-shadow: 1px 1px #333333;
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    z-index: 10;
  }

  .links {
    display: flex;
    gap: 3vw;
  }

  a {
    text-decoration: none;
    color: white;
    align-self: flex-end;
  }

  .theme-toggle {
    color: white;
    align-self: flex-end;
    filter: drop-shadow(1px 1px 0 #333333);
  }
}
</style>
