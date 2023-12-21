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

    <div id="cnv1" ref="cnvParent" :class="[{ hide: !editorVisible }]"></div>
  </div>
</template>

<style>
:root {
  font-family: 'Google Sans', 'Noto Sans Myanmar UI', arial, sans-serif;
  color: rgb(32, 33, 36);
}
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
span {
  display: inline-block;
  border: 2px solid blue;
  padding: 1rem;
  margin: 0.2rem;
  transition: all 0.4s;
  user-select: none;
}
span:hover {
  transform: scale(1.1);
}
.box {
  position: absolute;
  width: 100%;

  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  position: absolute;
  width: 100%;
  margin: 0;
}
canvas {
  border-radius: 2px;
  overscroll-behavior: none;
  box-shadow: 0px 0px 5px #1b66c95c;
}

.container {
  min-width: 30%;

  border-radius: 2px;
  padding: 3rem;

  text-align: center;
}
.item {
  margin-top: 2rem;
}
input {
  outline: none;
  border: none;
  border-radius: 2px;
  border: solid 1px #00000028;
  color: rgb(32, 33, 36);
  font-size: 1.2rem;

  margin: 1px 1px 0 1px;
  padding: 0.3rem 0.4rem;
}

h1 {
  color: rgb(32, 33, 36);
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;

  word-break: break-word;
}
.btns-flex {
  display: flex;
  justify-content: flex-end;
}
button {
  border: none;
  outline: none;
  transition: background 0.3s;
  padding: 0.7rem 1.6rem;
}
.btn {
  background-color: #1a73e8;

  color: white;
  border-radius: 2px;
}
.btn-invert {
  color: #1a73e8;
  background-color: transparent;
}
.btn-invert:hover {
  background-color: #f6fafe;
}

button:hover {
  background-color: #1b66c9;
}
</style>
