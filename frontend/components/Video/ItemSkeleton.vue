<template>
  <li class="video-list">
    <NuxtImg src="/temp/thumbnail.png" class="video-thumbnail" quality="1" />
    <div class="video-info">
      <NuxtImg src="/temp/profile.png" quality="1" />
      <article class="video-detail">
        <p>skeleton title</p>
        <div>
          <span>skeleton username</span>
          <span>skeleton date</span>
        </div>
      </article>
    </div>
  </li>
</template>

<style>
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
  width: 100%;
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
</style>
