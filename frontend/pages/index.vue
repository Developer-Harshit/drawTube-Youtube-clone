<template>
  <video controls autoPlay crossorigin="anonymus">
    <source
      src="http://localhost:5000/video/6586a41f4c05f7c32a067141"
      type="video/mp4"
    />
  </video>

  <VideoFinder> </VideoFinder>
</template>

<style>
.video-ul {
  padding: 0;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
}
.video-list,
video {
  width: 480px;
}
.video-thumbnail {
  width: 100%;
}
.video-info {
  padding: 0.4rem;
}
.video-info,
.video-detail {
  display: flex;
  gap: 0.5rem;
}
.video-info img {
  width: 2rem;
  height: 2rem;
}
.video-detail {
  overflow: hidden;
  flex-direction: column;
}
.video-detail p {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  margin: 0;
  white-space: nowrap;
}
.video-detail div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.video-detail span {
  font-size: 0.6rem;
}
@media (max-width: 640px) {
  .video-list,
  video {
    width: 99svw;
  }
}
</style>
