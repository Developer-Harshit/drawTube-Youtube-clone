<template>
  <ul class="video-ul">
    <li v-for="video in videos" :key="video" class="video-list">
      <img src="../assets/temp/thumbnail.png" class="video-thumbnail" />
      <div class="video-info">
        <img src="../assets/temp/profile.png" />
        <article class="video-detail">
          <p>The is the title of the video nonononononononononnonononono</p>
          <div>
            <span>Username</span>
            <span>6 June 2023</span>
          </div>
        </article>
      </div>
    </li>
  </ul>
</template>
<script setup>
const videos = [1, 2, 3, 4, 56, 8, 8, 9, 0, 13, 45, 366, 34, 64];
</script>

<style></style>
