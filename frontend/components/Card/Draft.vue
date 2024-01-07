<template>
  <div class="flex flex-col flex-wrap bg-slate-600 text-gray-50">
    <div>Title : {{ title }}</div>
    <NuxtLink :to="link">Link</NuxtLink>

    <div>Url : {{ url }}</div>
  </div>
</template>
<script setup>
defineProps(["title", "link", "url"]);
</script>
<style scoped></style>
