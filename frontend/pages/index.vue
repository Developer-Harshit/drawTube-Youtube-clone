<template>
  <video controls autoPlay crossorigin="anonymus">
    <source src="http://localhost:5000/videos/video/Couloir" type="video/mp4" />
  </video>
  <NuxtLink to="/login">Login </NuxtLink>
  <NuxtLink to="/editor">Editor</NuxtLink>
</template>

<script lang="ts" setup></script>

<style scoped></style>
