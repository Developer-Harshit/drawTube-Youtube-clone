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
        <h1>Log in</h1>
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

<!-- <style src="../assets/login-styles.css"></style> -->
