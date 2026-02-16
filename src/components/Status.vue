<template>
  <div @click="openModal" :class="`status ${doorStatus.door}`">
    {{ doorStatus.door }}
  </div>
  <div class="modal" v-if="modalOpen" @click="closeModal">
    <div class="modal-window">
      <span class="modal-close">X</span>
      <div :class="`tally ${doorStatus.door}`"></div>
      {{
        doorStatus.door === 'open'
          ? "The Space is currently open! You may come over and hang out. Keep in mind that there is no guarantee that people will be there for an extended period of time (unless it's currently the open thursday)."
          : 'The Lab is currently closed. A member will need to come in and open it for visitors.'
      }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  doorStatus: {
    type: Object,
    required: true,
  },
})

const modalOpen = ref(false)

const openModal = () => {
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}
</script>

<style>
.status {
  color: white;
  padding: 0.5rem 0.7rem;
  transform: translateY(0.5rem);
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  background-color: grey;
}

.status.open {
  background-color: green;
}

.status.closed {
  background-color: red;
}

@media (max-width: 950px) {
  .status {
    margin: 5px 5px 5px 0;
    transform: none;
    font-size: 0.8em;
  }
}

.tally {
  width: 100%;
  height: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: grey;
}

.tally.open {
  background-color: green;
}

.tally.closed {
  background-color: red;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-close {
  position: absolute;
  top: 0.3rem;
  right: 0.7rem;
  font-weight: bold;
  cursor: pointer;
}

.modal-window {
  position: relative;
  background-color: white;
  color: var(--text-color);
  text-shadow: none;
  font-weight: normal;
  padding: 2rem;
  border-radius: 5px;
  max-width: 40%;
  max-height: 80%;
  overflow-y: auto;
  text-align: center;
}
</style>
