<template>
  <div id="cnv1"></div>
</template>

<script setup>
const { editor } = defineProps(['editor']);

onMounted(() => {
  editor.init(0.7, 0.7, 'cnv1');
  editor.current = editor.createSurface(1280);
  editor.fill(editor.current, '#ffffff');
  editor.addEvents();

  function animate() {
    requestAnimationFrame(animate);

    editor.fill(editor, '#212121');
    editor.draw(editor.current);
  }
  animate();
});
</script>
