<template>
  <EditorVideo></EditorVideo>
</template>

<script setup>
// offline editor
// load | save data
// save data in db as drafts
onBeforeRouteLeave(() => {
  if (!confirm('We are leaving the page.Unsaved progress will be lost'))
    return false;
});
definePageMeta({
  layout: 'editor'
});
</script>
