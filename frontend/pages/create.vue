<script setup>
const opened = ref("draft"); // draft || video
const navLinks = computed(() => {
  if (opened.value == "draft")
    return [
      { to: "/create/draft/saved", icon: "person", text: "Saved Draft" },
      { to: "/create/draft/offline", icon: "person", text: "Offline Draft" },
      { to: "/create/draft", icon: "person", text: "Local Draft" }
    ];

  return [
    { to: "/create/video/saved", icon: "person", text: "Saved Video" },
    { to: "/create/video/offline", icon: "person", text: "Offline Video" },
    { to: "/create/video", icon: "person", text: "Local Video" }
  ];
});

const setTab = (mode) => {
  opened.value = mode;
  navigateTo("/create/" + mode);
};
</script>

<template>
  <div>
    <div>
      <button @click="setTab('draft')">Draft</button>
    </div>
    <div>
      <button @click="setTab('video')">Video</button>
    </div>
  </div>
  <NavBase :nav-links="navLinks" />
  <NuxtPage />
</template>

<style scoped>
button {
  background-color: aquamarine;
}
</style>
