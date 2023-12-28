<template>
  <Transition name="fade">
    <ul class="video-ul" v-if="!pending">
      <VideoItem
        v-for="video in data.output"
        :key="video._id"
        :video-link="'/video/' + video._id"
        :video-title="video.title"
        video-thumbnail="/temp/thumbnail.png"
        user-profile="/temp/profile.png"
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
const { data, pending, error, refresh } = useLazyFetch(
  'http://localhost:5000/video'
);
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
