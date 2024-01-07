<template>
  <li class="video-list">
    <NuxtLink :to="videoLink">
      <LazyNuxtImg
        :src="videoThumbnail"
        placeholder-src="/skeleton/profile.png"
        class="video-thumbnail"
        auto-sizes
        alt="thumbnail"
      />
    </NuxtLink>
    <div class="video-info">
      <LazyNuxtImg
        :src="userProfile"
        blurhash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        auto-sizes
        alt="userprofile"
      />

      <article class="video-detail">
        <p>{{ videoTitle }}</p>
        <div>
          <span>{{ userName }}</span>
          <span>{{ videoDate }}</span>
        </div>
      </article>
    </div>
  </li>
</template>

<script lang="js" setup>
 defineProps(
  {videoThumbnail:"string",userProfile:"string",videoTitle:"string",videoDate:"string",userName:"string" ,videoLink:"string"}
)
</script>
<style></style>
<style src="assets/css/videoItem.css"></style>
