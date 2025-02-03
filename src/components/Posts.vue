<template>
    <div class="posts">
        <Post v-for="post in posts" :post="post" :key="post.id" />
        <a href="https://chaos.social/@munichmakerlab">See all Posts =></a>
    </div>
</template>

<script setup>
import Post from './Post.vue';

const postsUrl =
  'https://chaos.social/api/v1/accounts/111578979164883551/statuses'

const fetchPosts = await fetch(postsUrl)

let posts = await fetchPosts.json()
// Format Reblogs

posts = posts.map((post) => (post.reblog ? post.reblog : post))
</script>

<style>
.posts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}
</style>