<template>
  <Transition name="fade">
    <ul class="video-ul" v-if="finished">
      <VideoItem
        v-for="video in videos"
        :key="video"
        video-link="/video/jack"
        video-title="The is the title of the video"
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
const finished = ref(false);
let videos = ref();
const loadData = () => {
  setTimeout(() => {
    finished.value = true;
    videos.value = [1, 2, 3, 4, 56, 8, 8, 9, 0, 13, 45, 366, 34, 64];
  }, 1000 * 5);
};

loadData();
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
