<script setup>
defineProps(["navLinks"]);
</script>

<template>
  <nav
    class="nav m-0 flex justify-evenly overflow-hidden bg-slate-900 shadow-red-800"
  >
    <template v-for="link in navLinks" :key="link.text">
      <NuxtLink
        :to="link.to"
        class="nav-link flex flex-col items-center justify-center flex-grow min-w-[50px] overflow-hidden whitespace-nowrap font-sans text-sm text-slate-600 py-4 hover:bg-slate-950 hover:text-slate-50"
      >
        <i class="material-icons nav-icon text-lg text-slate-50">
          {{ link.icon }}
        </i>
        <span class="nav-text">{{ link.text }}</span>
      </NuxtLink>
    </template>
  </nav>
</template>
<style scoped>
* {
  transition: all 0.1s;
}
.router-link-active,
.router-link-active:hover {
  background-color: #ffffff;
  color: rgb(208, 28, 9);
}
.router-link-active .nav-icon {
  color: rgb(208, 28, 9);
}
</style>
