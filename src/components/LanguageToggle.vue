<template>
  <a :href="otherLocaleUrl" class="language-toggle">
    <span :class="{ active: props.locale === 'en' }">EN</span>
    <span class="separator">|</span>
    <span :class="{ active: props.locale === 'de' }">DE</span>
  </a>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  locale: {
    type: String,
    required: true,
  },
});

const otherLocaleUrl = computed(() => {
  const path = window.location.pathname;
  if (props.locale === 'en') {
    return `/de${path}`;
  }
  return path.replace(/^\/de/, '') || '/';
});
</script>

<style scoped>
.language-toggle {
  text-decoration: none;
  color: inherit;
  font-weight: 800;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
}

.language-toggle span {
  opacity: 0.5;
}

.language-toggle span.active {
  opacity: 1;
}

.separator {
  margin: 0 2px;
  opacity: 0.5;
}
</style>
