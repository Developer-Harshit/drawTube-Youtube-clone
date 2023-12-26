<template>
  <li class="video-list">
    <NuxtLink :to="videoLink">
      <NuxtImg :src="videoThumbnail" class="video-thumbnail" quality="50" />
    </NuxtLink>
    <div class="video-info">
      <NuxtImg :src="userProfile" quality="50" />
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
<style src="assets/styles/videoItem.css"></style>
