<template>
  <div>
    <NuxtImg :src="userImg"></NuxtImg>
    <p>
      <slot />
    </p>
  </div>
</template>
<script setup>
defineProps({
  userImg: 'string'
});
</script>
<style scoped>
div {
  background-color: rgba(214, 211, 211, 0.57);
  color: rgb(90, 89, 88);
  font-weight: 600;

  border-radius: 10px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 0 1rem;
  padding: 1rem;
  margin: 1rem 0rem;
  margin-bottom: 5rem;
}
img {
  width: 4rem;
  height: 4rem;
  border: 2px solid white;
  border-radius: 50px;
}
</style>
