<template>
  <div class="post">
    <div class="post-date">
      {{ new Date(post.created_at).toLocaleDateString('en-GB', dateOptions) }}
    </div>
    <div v-if="imageAttachments.length" :id="galleryId" :class="gridClass">
      <a v-for="attachment in imageAttachments"
         :key="attachment.id"
         :href="attachment.url"
         :data-pswp-width="attachment.meta?.original?.width || 1200"
         :data-pswp-height="attachment.meta?.original?.height || 900"
         target="_blank"
         rel="noreferrer">
        <img :src="attachment.preview_url" :alt="attachment.description || ''" loading="lazy" />
      </a>
    </div>
    <div class="post-content" v-html="post.content"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

const props = defineProps(['post'])
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

const imageAttachments = computed(() =>
  props.post.media_attachments.filter(a => a.type === 'image')
)

const galleryId = computed(() => `gallery-${props.post.id}`)

const gridClass = computed(() => {
  const count = imageAttachments.value.length
  if (count === 0) return ''
  if (count === 1) return 'media-grid grid-1'
  if (count === 2) return 'media-grid grid-2'
  if (count === 3) return 'media-grid grid-3'
  return 'media-grid grid-4'
})

let lightbox = null

onMounted(() => {
  if (imageAttachments.value.length === 0) return
  lightbox = new PhotoSwipeLightbox({
    gallery: `#${galleryId.value}`,
    children: 'a',
    pswpModule: () => import('photoswipe'),
  })
  lightbox.init()
})

onUnmounted(() => {
  lightbox?.destroy()
  lightbox = null
})
</script>

<style scoped>
  .post {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    max-width: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .post-content {
    width: 100%;
  }

  @media (max-width: 950px) {
    .post {
      padding: 10px;
    }
  }

  .post-date {
    font-size: 0.8rem;
    color: var(--muted);
    margin-bottom: 10px;
    align-self: flex-end;
  }

  :deep(.hashtag) {
    font-size: 0.8rem;
  }

  .media-grid {
    display: grid;
    gap: 4px;
    max-height: 400px;
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
  }

  .media-grid a {
    display: block;
    overflow: hidden;
    min-height: 0;
  }

  .media-grid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    cursor: pointer;
  }

  .grid-1 {
    grid-template-columns: 1fr;
  }

  .grid-2 {
    grid-template-columns: 1fr 1fr;
  }

  .grid-3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .grid-3 a:first-child {
    grid-row: 1 / 3;
  }

  .grid-4 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  .grid-4 a:nth-child(n+5) {
    display: none;
  }
</style>
