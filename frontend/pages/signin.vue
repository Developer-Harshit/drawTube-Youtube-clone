<script setup>
const Canvas = useCanvas();
const sketch = new Canvas();
const cnvParent = ref(null);
const editorVisible = ref(false);
const toggleEditor = () => {
  editorVisible.value = !editorVisible.value;
  if (editorVisible.value) {
    sketch.addKeyBind();
    sketch.resetControls();
  } else {
    sketch.resetControls();
    sketch.removeKeyBind();
  }
};

onMounted(() => {
  sketch.init(1, 1, cnvParent.value);

  sketch.current = sketch.createSurface(1280);
  sketch.fill(sketch.current, '#ffffff');
  sketch.addEvents();

  function animate() {
    requestAnimationFrame(animate);

    sketch.fill(sketch, '#212121');
    sketch.draw(sketch.current);
  }
  animate();
});
</script>
<template>
  <div class="box">
    <div id="cnv1" ref="cnvParent" :class="[{ hide: !editorVisible }]"></div>
    <Transition name="fade" mode="out-in">
      <div class="container" v-if="!editorVisible">
        <div class="item">
          <NuxtLink to="/">
            <IconGoogle2 />
          </NuxtLink>
        </div>
        <div class="item">
          <h1>Sign in</h1>
          <p>Press in black area to draw</p>
        </div>
        <div class="item">
          <label for="username"> Username</label>
          <input type="text" name="username" id="username" />
        </div>
        <div class="item">
          <label for="email"> Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div class="item">
          <label for="profile-editor"> Profile Picture </label>
          <button class="btn" @click="toggleEditor">Open Editor</button>
        </div>

        <div class="item btns-flex">
          <button class="btn-invert" @click="sketch.fill(sketch.current)">
            Reset
          </button>
          <button class="btn">Next</button>
        </div>
      </div>

      <div id="controls" v-else>
        <button class="btn" @click="toggleEditor">Close Editor</button>
        <div class="item">
          <ControlPane :editor="sketch" />
          <ControlZoom :editor="sketch" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style src="../assets/login-styles.css"></style>

<style>
.hide {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

body {
  position: absolute;

  margin: 0;
}
canvas {
  border-radius: 2px;
  overscroll-behavior: none;
  box-shadow: 0px 0px 5px #1b66c95c;
}
</style>
