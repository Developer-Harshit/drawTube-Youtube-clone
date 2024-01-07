<template>
  <div>
    <label :for="field">
      <slot></slot>
    </label>
    <input
      :type="type"
      :name="field"
      :id="field"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>
<script setup>
defineProps(["field", "type", "modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>
