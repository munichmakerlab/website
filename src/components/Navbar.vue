<template>
  <div class="hamburger" @click="toggleCollapse"><img :src="isCollapsed ? '/img/menu.svg' : '/img/window-close.svg'" alt="menu handle"></div>
  <nav :class="isCollapsed ? 'collapsed' : ''">
    <a class="logo" href="/">Munich Maker Lab</a>
    <div class="links">
      <a v-for="link in links" :key="link.path" :href="link.path">{{
        link.name
      }}</a>
      <Suspense>
        <Status />
        <template #fallback> Loading... </template>
      </Suspense>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import Status from './Status.vue'

const links = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
   {
    name: 'Visit',
    path: '/visit',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
  {
    name: 'Calendar',
    path: '/calendar',
  },
  {
    name: 'Wiki',
    path: 'https://wiki.munichmakerlab.de/',
  },
 
]

const isCollapsed = ref(true)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
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
}

/* Desktop Menu */
@media (min-width: 951px) {
  .hamburger {
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
}
</style>
