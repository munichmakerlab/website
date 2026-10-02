<template>
  <div class="post">
    <a class="post-date" :href="post.url" target="_blank" rel="noopener noreferrer">
      <time :datetime="post.created_at">
        {{ new Date(post.created_at).toLocaleDateString(props.locale, dateOptions) }}
      </time>
    </a>
    <div v-if="imageAttachments.length" :id="galleryId" :class="gridClass">
      <a
        v-for="attachment in imageAttachments"
        :key="attachment.id"
        :href="attachment.url"
        :data-pswp-width="attachment.meta?.original?.width || 1200"
        :data-pswp-height="attachment.meta?.original?.height || 900"
        target="_blank"
        rel="noreferrer"
      >
        <img :src="attachment.preview_url" :alt="attachment.description || ''" loading="lazy" />
      </a>
    </div>
    <video
      v-for="attachment in videoAttachments"
      :key="attachment.id"
      class="post-video"
      :src="attachment.url"
      :poster="attachment.preview_url"
      :width="attachment.meta?.original?.width"
      :height="attachment.meta?.original?.height"
      :aria-label="attachment.description || t.posts.videoLabel"
      :controls="attachment.type === 'video'"
      :autoplay="attachment.type === 'gifv'"
      :loop="attachment.type === 'gifv'"
      muted
      playsinline
      preload="none"
    ></video>
    <div class="post-content" v-html="post.content"></div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { getUiTranslations } from '../i18n/ui/ui-i18n-helper';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  locale: {
    type: String,
    default: 'en',
  },
});
const t = getUiTranslations(props.locale);
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

const imageAttachments = computed(() => props.post.media_attachments.filter((a) => a.type === 'image'));

// Mastodon uses "gifv" for short looping animations (converted GIFs)
const videoAttachments = computed(() =>
  props.post.media_attachments.filter((a) => a.type === 'video' || a.type === 'gifv'),
);

const galleryId = computed(() => `gallery-${props.post.id}`);

const gridClass = computed(() => {
  const count = imageAttachments.value.length;
  if (count === 0) return '';
  if (count === 1) return 'media-grid grid-1';
  if (count === 2) return 'media-grid grid-2';
  if (count === 3) return 'media-grid grid-3';
  return 'media-grid grid-4';
});

let lightbox = null;

onMounted(() => {
  if (imageAttachments.value.length === 0) return;
  lightbox = new PhotoSwipeLightbox({
    gallery: `#${galleryId.value}`,
    children: 'a',
    pswpModule: () => import('photoswipe'),
  });
  lightbox.init();
});

onUnmounted(() => {
  lightbox?.destroy();
  lightbox = null;
});
</script>

<style scoped>
.post {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  width: 100%;
  max-width: 750px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-content {
  width: 100%;
  line-height: 1.6;
}

.post-content :deep(p) {
  margin: 0 0 0.75rem;
}

.post-content :deep(p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 950px) {
  .post {
    padding: 1rem;
  }
}

.post-date {
  font-size: 0.8rem;
  color: var(--muted);
  text-decoration: none;
  align-self: flex-start;
}

.post-date:hover,
.post-date:focus-visible {
  text-decoration: underline;
}

:deep(.hashtag) {
  font-size: 0.8rem;
  text-decoration: none;
}

:deep(.hashtag:hover),
:deep(.hashtag:focus-visible) {
  text-decoration: underline;
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

.post-video {
  display: block;
  width: 100%;
  height: auto;
  max-height: 500px;
  border-radius: 8px;
  background: var(--card);
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
.grid-4 a:nth-child(n + 5) {
  display: none;
}
</style>
