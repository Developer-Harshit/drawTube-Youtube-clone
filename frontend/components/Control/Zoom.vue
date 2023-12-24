<template>
  <div>
    <span class="zoom control-span" data-val="Q" @click="props.editor.zoomEvent"
      >+</span
    >
    <span class="zoom control-span" data-val="E" @click="props.editor.zoomEvent"
      >-</span
    >
  </div>
</template>

<script setup>
const props = defineProps(['editor']);
</script>
