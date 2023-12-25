<template>
  <VideoFinder></VideoFinder>
</template>

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
