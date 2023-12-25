<template>
  <div>
    <div class="video-div">
      <video controls autoPlay crossorigin="anonymus">
        <source
          src="http://localhost:5000/video/6586a41f4c05f7c32a067141"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>

<script setup></script>

<style>
.video-div {
  text-align: center;
}
/* for width greater than height */
video,
source {
  width: auto;
  height: 99svh;
}
/* for height greater than width  */
@media (min-height: 100svw) {
  video,
  source {
    width: 99svw;
    height: auto;
  }
}
</style>
