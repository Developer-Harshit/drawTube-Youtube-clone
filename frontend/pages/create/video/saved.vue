<template>
  Create video

  <form method="POST" @submit.prevent="creator()">
    <UIInput
      type="text"
      field="name"
      v-model="formData.name"
      @update:model-value="(val) => (formData.name = val)"
    >
      name
    </UIInput>

    <UIInput
      type="text"
      field="desc"
      v-model="formData.desc"
      @update:model-value="(val) => (formData.desc = val)"
    >
      desc
    </UIInput>
    <UIInput
      type="text"
      field="fps"
      v-model="formData.fps"
      @update:model-value="(val) => (formData.fps = val)"
    >
      fps
    </UIInput>
    <UIInput
      type="text"
      field="datauri"
      v-model="formData.datauri"
      @update:model-value="(val) => (formData.datauri = val)"
    >
      datauri
    </UIInput>

    <div>
      <button type="submit" @click="(e) => (e.target.disabled = true)">
        Submit
      </button>
    </div>
  </form>
</template>
<script setup>
const { creator, pending, sucess, formData } = createVideo();
</script>
