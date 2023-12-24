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
</style>

<script setup>
const router = useRouter();

useHead({
  bodyAttrs: {
    class: 'default'
  }
});
</script>
