<template>
  <div class="video-div" v-if="sucess">
    <video controls autoPlay crossorigin="anonymus">
      <source :src="video.url" type="video/mp4" />
    </video>
    <article class="info">
      <h2>Description</h2>
      <p class="title">
        {{ video.name }}
      </p>
      <div class="detail">
        <p><span>Likes</span> <span>0</span></p>
        <p><span>Uploaded</span> <span>20 June 2021</span></p>
        <p><span>Creator</span> <span>Username</span></p>
      </div>
      <LongText class="desc-box">
        {{ video.desc }}
      </LongText>

      <UserCard :user-img="video.user.profile">
        {{ video.user.name }}
      </UserCard>
    </article>
  </div>
</template>
<script setup>
const { finder, video, sucess, pending } = useVideo();

finder(useRoute().params.id);

const videos = {
  user: { profile: "ha" },
  title: "test title",
  desc: "test desc",
  url: "test url"
};
</script>
<style scoped>
.video-div {
  text-align: center;
}

video {
  /* width is bigger  */

  width: calc(100svw - 12px);
  height: 56.25svw;
}
@media (min-width: 177.76svh) {
  video {
    /* height is bigger  */
    width: calc (177.76svh - 12px);
    height: 99.99svh;
  }
}
.info label {
  display: inline;

  background-color: #00acff;

  font-size: 0.8em;
}

.info {
  padding: 16px;
}
.info .detail {
  display: flex;
  justify-content: space-around;
  gap: 0 2rem;
  flex-grow: 1;
  flex-wrap: wrap;
}
.info input:checked ~ label {
  display: none;
}
.info input {
  display: none;
}
.info input:checked + .desc p {
  -webkit-line-clamp: unset;
}
.desc p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.info div p {
  display: flex;
  flex-direction: column;
}
.info div p span:first-child {
  font-weight: bold;
  color: rgb(53, 47, 47);
  font-size: 1.1rem;
}
.info div p span:last-child {
  color: rgb(85, 82, 82);
  font-weight: 100;
  font-size: 0.6rem;
}
.desc-box,
.info h2,
.title {
  text-align: left;
  word-wrap: break-word;
}

.desc-box {
  font-size: 0.7rem;
  line-height: 1.1rem;
  background-color: rgba(214, 211, 211, 0.57);
  border-radius: 10px;
  padding: 1rem 0.5rem;
}
</style>
