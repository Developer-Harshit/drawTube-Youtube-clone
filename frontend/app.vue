<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Drawtube",

  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
      crossorigin: "use-credentials"
    }
  ],
  meta: [
    { name: "theme-color", content: "#ffffff" },
    { name: "description", content: "drawtube" }
  ]
});
</script>
