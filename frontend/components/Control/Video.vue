<template>
  <div>
    <span class="ha control-span" data-val="Q" @click="props.editor.zoomEvent"
      >+</span
    >
  </div>
</template>

<script setup>
const props = defineProps(['editor']);
</script>
