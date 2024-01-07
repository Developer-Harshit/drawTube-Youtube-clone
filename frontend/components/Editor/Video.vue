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
  <div>
    <input type="file" ref="datainput" accept="application/json" />
    <button @click="loadData">Load data</button>
  </div>
  <div>
    <button @click="saveData">Save data</button>
    <a ref="downloadbtn" href="#" download>Downlaod</a>
  </div>
</template>

<script setup>
const idx = ref(0);
const isPlaying = ref(false);
const isOnion = ref(false);

const cnvParent = ref(null);
const downloadbtn = ref(null);
const datainput = ref(null);

const Editor = useEditor();
const editor = new Editor();

editor.idx = idx;
const play = (fps = 12) => {
  editor.play(fps, isPlaying);
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

const onDataLoaded = (e) => {
  const jsonData = JSON.parse(e.target.result);
  //console.log(jsonData);
  if (jsonData.type != "editor") return false;
  editor.surfaces = [];
  idx.value = 0;
  for (let i = 0; i < jsonData.frames.length; i++) {
    const dataUrl = jsonData.frames[i];
    const surf = editor.createSurface(720);

    const img = new Image();

    img.onload = () => {
      surf.ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
    editor.surfaces.push(surf);
  }
};
const loadData = () => {
  if (!datainput.value) {
    //console.log('returning');
    return;
  }
  const allFiles = datainput.value.files;
  if (!(allFiles.length > 0)) {
    //console.log('returning');
    return;
  }
  const jsonFile = allFiles[0];

  const reader = new FileReader();
  reader.onload = onDataLoaded;
  reader.readAsText(jsonFile);
  datainput.value.value = null;
};

const saveData = () => {
  const frameUrls = [];

  for (let i = 0; i < editor.surfaces.length; i++) {
    const surf = editor.surfaces[i];
    const dataUrl = surf.cnv.toDataURL("image/png", 1);
    frameUrls.push(dataUrl);
  }
  const finalData = {
    type: "editor",
    frames: frameUrls
  };

  const encodedData =
    "data:application/json;base64," + btoa(JSON.stringify(finalData));
  downloadbtn.value.href = encodedData;
  //console.log(downloadbtn.value.href);
  downloadbtn.value.click();
};

onMounted(() => {
  editor.init(1, 1, cnvParent.value, 720);
  editor.addEvents();

  function animate() {
    requestAnimationFrame(animate);
    if (isPlaying.value) return;

    editor.fill(editor, "#212121");
    if (isOnion.value && idx.value > 0) editor.drawOnion();
    else editor.draw(editor.get());
  }
  animate();
});
</script>
<style scoped></style>
