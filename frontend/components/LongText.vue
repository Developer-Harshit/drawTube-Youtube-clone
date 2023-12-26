<template>
  <div>
    <input type="checkbox" id="expanded" />
    <span>
      <slot />
    </span>

    <label for="expanded" role="button">read more</label>
  </div>
</template>
<style scoped>
input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
span {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
input:focus ~ label {
  outline: -webkit-focus-ring-color auto 5px;
}
input:checked + span {
  -webkit-line-clamp: unset;
}
input:checked ~ label {
  display: none;
}

label {
  margin-top: 0.5rem;

  padding: 0.2em 0.6em;

  background-color: #4d5153;
  color: #fff;
  font-size: 0.8em;
}
</style>
