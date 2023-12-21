<template>
  <div class="editor">
    <div id="cnv1"></div>
  </div>
</template>

<script setup>
const Editor = useEditor();
const editor = new Editor();

onMounted(() => {
  editor.init(0.7, 0.7, 'cnv1', 1280);
  editor.addEvents();

  function animate() {
    requestAnimationFrame(animate);

    editor.fill(editor, '#212121');
    editor.draw(editor.get());
  }
  animate();
});
</script>

<style></style>
