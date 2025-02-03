<template>
  <div class="post">
        <Swiper :navigation="post.media_attachments.length >= 2" :modules="modules" style="width: 100%" >
        <SwiperSlide v-for="attachment in post.media_attachments" :key="attachment.id">
          <img :src="attachment.preview_url" alt="banane" style="width: 100%">
        </SwiperSlide>
    </Swiper>
    <div class="post-content" v-html="post.content"></div>
    <footer>
      {{ new Date(post.created_at).toLocaleDateString('en-GB', dateOptions) }}
    </footer>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
const props = defineProps(['post'])
const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
const modules = [Navigation]
</script>

<style>
    .post {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>