<script setup></script>
<template>
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
      <div class="item">
        <label for="email"> Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div class="item">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div class="item btns-flex">
        <button class="btn-invert" @click="sketch.fill(sketch.current)">
          Reset
        </button>
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
