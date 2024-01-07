<template>
  <nav class="flex flex-row justify-between">
    <div>
      <IconYoutube />
    </div>
    <ul class="flex flex-row gap-3">
      <li>
        <div>
          <button @click="toggleNav">Hide Nav</button>
        </div>
      </li>
      <li>
        <div>
          <select v-model="$colorMode.preference">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const showNav = useShowNav();
const toggleNav = () => {
  showNav.value = !showNav.value;
};
</script>
