<template>
  <div v-if="!hasConsent" class="consent">
    We use Google Calendar to manage our Events. If you want to see them you
    have to consent to send data to Google.
    <button @click="consent">Consent</button>
  </div>
  <div v-if="hasConsent" class="calendar">
    <iframe
      src="https://calendar.google.com/calendar/embed?src=lbd0aa2rlahecp7juvp35hd0k0%40group.calendar.google.com&ctz=Europe%2FBerlin"
      style="border: 0"
      width="800"
      height="600"
      frameborder="0"
      scrolling="no"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const hasConsent = computed(() => {
  return window.localStorage.getItem('calendarConsent')
})
const consent = () => {
  localStorage.setItem('calendarConsent', true)
  window.location.reload()
}
</script>


<style>
button {
    display: block;
    margin: auto;
    background: none;
    border-color: var(--text-color);
    font-size: 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    margin-top: 2rem;
}
</style>