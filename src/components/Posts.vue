<template>
  <div class="posts">
    <Post v-for="post in posts" :post="post" :key="post.id" :locale="props.locale" />
    <a href="https://chaos.social/@munichmakerlab">{{ t.posts.seeAll }}</a>
  </div>
</template>

<script setup>
import Post from './Post.vue';
import { getUiTranslations } from '../i18n/ui/ui-i18n-helper';

const props = defineProps({
  locale: {
    type: String,
    default: 'en',
  },
});

const t = getUiTranslations(props.locale);

const postsUrl = 'https://chaos.social/api/v1/accounts/111578979164883551/statuses';

const fetchPosts = await fetch(postsUrl);

let posts = await fetchPosts.json();
// Format Reblogs

posts = posts.map((post) => (post.reblog ? post.reblog : post));
</script>

<style>
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
</style>
