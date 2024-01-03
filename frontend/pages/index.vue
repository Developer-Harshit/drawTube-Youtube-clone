<template>
  <select v-model="$colorMode.preference">
    <option value="system">System</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>

  <VideoFinder></VideoFinder>
</template>

<script setup>
const colorMode = useColorMode();

console.log("Pref: ", colorMode.preference);

const { finder, pending, sucess, videos } = useFinder();
finder();
</script>

<style>
.video-ul {
  padding: 0;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  gap: 4px;
}
.video-list {
  width: 480px;
}

@media (max-width: 640px) {
  .video-list {
    width: 99svw;
  }
}
</style>
