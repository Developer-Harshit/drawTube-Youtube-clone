<template>
  <div id="cnv1" ref="cnvParent"></div>
  <button @click="play">Play</button>
  <button @click="createFrame">Add Frame</button>
  <input
    type="number"
    :value="idx"
    @change="jumpFrame"
    min="0"
    :max="editor.surfaces.length - 1"
  />
  <button @click="changeFrame(-1)">Decrement</button>
  <button @click="changeFrame(+1)">Increment</button>
  <button @click="editor.fill(editor.get())">Clear</button>
  <input type="checkbox" v-model="isOnion" />
</template>

<script setup>
const idx = ref(0);
const isPlaying = ref(false);
const isOnion = ref(false);
const cnvParent = ref(null);
const Editor = useEditor();
const editor = new Editor();

editor.idx = idx;
const play = () => {
  editor.play(42, isPlaying);
};
const updateValidFrame = (val) => {
  val = Math.max(0, val);
  val = Math.min(val, editor.surfaces.length - 1);
  idx.value = val;
  return val;
};

const changeFrame = (inc) => {
  let val = idx.value + inc;
  updateValidFrame(val);
};
const jumpFrame = (e) => {
  let val = e.target.value;

  e.target.value = updateValidFrame(val);
};
const createFrame = () => {
  const surf = editor.createSurface(720);
  idx.value += 1;
  editor.surfaces.splice(idx.value, 0, surf);
};

onMounted(() => {
  editor.init(1, 1, cnvParent.value, 720);
  editor.addEvents();

  function animate() {
    requestAnimationFrame(animate);
    if (isPlaying.value) return;

    editor.fill(editor, '#212121');
    if (isOnion.value && idx.value > 0) editor.drawOnion();
    else editor.draw(editor.get());
  }
  animate();
});
</script>
<style>
body {
  background-color: #212121;
}
</style>
