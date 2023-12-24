<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>
<style>
.editor {
  overscroll-behavior: none;
  margin: 0;
}
canvas {
  overscroll-behavior: none;
}
</style>
<script setup>
useHead({
  bodyAttrs: {
    class: 'editor'
  }
});
</script>
