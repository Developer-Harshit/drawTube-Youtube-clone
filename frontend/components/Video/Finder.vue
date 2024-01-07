<template>
  <Transition name="fade">
    <ul class="video-ul" v-if="videos.length > 0">
      <VideoItem
        v-for="video in videos"
        :key="video._id"
        :video-link="'/video/' + video._id"
        :video-title="video.name"
        video-thumbnail="/temp/thumbnail.png"
        :user-profile="video.user.profile"
        user-name="Username"
        video-date="6 June 2021"
      >
      </VideoItem>
    </ul>
    <ul class="video-ul" v-else>
      <VideoItemSkeleton v-for="index in 10" :key="index"> </VideoItemSkeleton>
    </ul>
  </Transition>
</template>

<script setup>
defineProps(["videos"]);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
