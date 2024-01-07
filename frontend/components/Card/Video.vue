<template>
  <div class="video-list">
    <NuxtLink :to="link">
      <LazyNuxtImg
        :src="thumb"
        placeholder="/skeleton/thumbnail.png"
        class="video-thumbnail"
        alt="thumbnail"
      />
    </NuxtLink>
    <div class="video-info">
      <LazyNuxtImg
        :src="profile"
        placeholder="/skeleton/profile.png"
        alt="profile"
      />

      <article class="video-detail">
        <p>{{ title }}</p>
        <div>
          <span>{{ uname }}</span>
          <span>{{ date }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
defineProps(["thumb", "profile", "title", "date", "uname", "link"]);
</script>
