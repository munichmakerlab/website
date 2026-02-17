<template>
  <button @click="$emit('click')" aria-label="Toggle menu">
    <svg v-if="isOpen" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" /></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
  </button>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
})
</script>

<style scoped>
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;
}
</style>
