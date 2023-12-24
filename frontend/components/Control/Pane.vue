<template>
  <div>
    <span
      class="pane control-span"
      v-for="item in paneItems"
      :key="item"
      :data-val="item"
      @click="props.editor.paneEvent"
    >
      {{ item }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps(['editor']);
const paneItems = ['W', 'A', 'S', 'D'];
</script>

<style scoped></style>
