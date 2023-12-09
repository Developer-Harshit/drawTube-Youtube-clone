<script setup>
const { createSketch, clearCanvas } = useSketch();
const easingFac = 0.7;
var clearFunc;
onMounted(() => {
  const mouse = { x: 0, y: 0 };
  const pmouse = { x: 0, y: 0 };

  const cnv = createSketch('cnv1', innerWidth * 0.8, innerWidth * 0.2);
  const ctx = cnv.getContext('2d');
  var isDrawing = false;
  clearFunc = clearCanvas(cnv, ctx);

  function updateMouse(cx, cy, eFac = easingFac) {
    const rect = cnv.getBoundingClientRect();
    const targetX = cx - rect.left;
    const targetY = cy - rect.top;
    pmouse.x = mouse.x;
    pmouse.y = mouse.y;
    mouse.x += (targetX - mouse.x) * eFac;
    mouse.y += (targetY - mouse.y) * eFac;
  }
  function drawLine() {
    if (!isDrawing) return;
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(pmouse.x, pmouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.closePath();
  }
 addEventListener('resize', (e) => {
cnv.width = innerWidth * 0.8;
    cnv.height = innerWidth * 0.2;
  });
  addEventListener('mousedown', (e) => {
    updateMouse(e.clientX, e.clientY, 1);
    isDrawing = true;
  });

  addEventListener('mouseup', () => {
    isDrawing = false;
  });

  cnv.addEventListener('mousemove', (e) => {
    updateMouse(e.clientX, e.clientY);
    drawLine();
  });

  addEventListener('touchstart', (e) => {
    isDrawing = true;

    const touch = e.touches[0] || e.changedTouches[0];
    updateMouse(touch.clientX, touch.clientY, 1);
  });
  addEventListener('touchend', () => {
    isDrawing = false;
  });
  addEventListener('touchmove', (e) => {
    const touch = e.touches[0] || e.changedTouches[0];

    updateMouse(touch.clientX, touch.clientY);
    drawLine();
  });
});
</script>
<template>
  <div class="box">
    <div class="container">
      <div class="item">
        <IconGoogle2 />
      </div>
      <div class="item">
        <h1>Sign in</h1>
        <p>Press in black area to draw</p>
      </div>
      <div class="item" id="cnv1">
        <!-- <input type="text" placeholder="Email or Phone" /> -->
      </div>
      <div class="item btns-flex">
        <button class="btn-invert" @click="clearFunc">Clear</button>
        <button class="btn">Next</button>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  font-family: 'Google Sans', 'Noto Sans Myanmar UI', arial, sans-serif;
  color: rgb(32, 33, 36);
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
