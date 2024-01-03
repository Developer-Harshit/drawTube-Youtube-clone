<template>
  <main>
    <slot />
  </main>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "fixed"
  }
});
</script>
<style></style>
