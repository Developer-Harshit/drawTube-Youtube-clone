<template>
  <div>
    <Navbar></Navbar>

    <slot />
  </div>
</template>
<style>
.default {
  margin: 0;
}
.default::-webkit-scrollbar {
  width: 12px;
}
.default::-webkit-scrollbar-track {
  background-color: rgba(38, 1, 40, 0.838);
}
.default::-webkit-scrollbar-thumb {
  background-color: rgba(236, 182, 182, 0.714);
}
.default::-webkit-scrollbar-track:hover {
  background-color: rgb(38, 1, 40);
}
.default::-webkit-scrollbar-thumb:hover {
  background-color: rgba(236, 182, 182, 0.928);
}
</style>

<script setup>
useHead({
  bodyAttrs: {
    class: 'default'
  }
});
</script>
