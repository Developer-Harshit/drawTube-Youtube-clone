<script setup>
const Canvas = useCanvas();
const sketch = new Canvas();
const { createPickr } = usePickr();
const paneItems = ['W', 'A', 'S', 'D'];

onMounted(() => {
  sketch.createCanvas(0.8, 0.2, 'cnv1');
  sketch.addEvents();
  sketch.current = sketch.createSurface(1980);

  sketch.fillSurf(sketch.current, '#ffffff');

  function animate() {
    requestAnimationFrame(animate);

    sketch.fillSurf(sketch, '#212121');
    sketch.drawCurrent();
  }
  animate();
});
</script>
<template>
  <div id="pal-body">
    <div id="pal"></div>
  </div>
  <div class="box">
    <div class="container">
      <div class="item">
        <NuxtLink to="/">
          <IconGoogle2 />
        </NuxtLink>
      </div>
      <div class="item">
        <h1>Sign in</h1>
        <p>Press in black area to draw</p>
      </div>
      <div class="item" id="cnv1">
        <!-- <input type="text" placeholder="Email or Phone" /> -->
      </div>
      <div class="item btns-flex">
        <button class="btn-invert" @click="sketch.fillSurf(sketch.current)">
          Clear
        </button>
        <button class="btn">Next</button>
      </div>
      <div>
        <span
          class="pane"
          v-for="item in paneItems"
          :key="item"
          :data-val="item"
          @click="sketch.paneEvent"
        >
          {{ item }}
        </span>
      </div>
      <div>
        <span class="zoom">+</span>
        <span class="zoom">-</span>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  font-family: 'Google Sans', 'Noto Sans Myanmar UI', arial, sans-serif;
  color: rgb(32, 33, 36);
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
  max-width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  position: absolute;
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0;
  overflow-y: hidden;
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
  padding: 3rem 4rem;
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
