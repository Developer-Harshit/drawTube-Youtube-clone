<template>
  <li class="skeleton-list video-list">
    <img src="/skeleton/thumbnail.png" class="video-thumbnail" />
    <div class="video-info">
      <img src="/skeleton/profile.png" />
      <article class="video-detail">
        <p></p>
        <div>
          <span></span>
          <span></span>
        </div>
      </article>
    </div>
  </li>
</template>

<style src="assets/styles/videoItem.css"></style>
<style scoped>
.skeleton-list {
  animation: pulse 2s ease-in-out infinite;
}
.skeleton-list .video-detail p {
  width: 70%;
  height: 0.8rem;
  margin: 0;
  background-color: #d7d3d3;
}
.skeleton-list .video-detail span {
  width: 20%;
  height: 0.6rem;
  background-color: #d7d3d3;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
