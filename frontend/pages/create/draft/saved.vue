<script setup>
const { creator, pending, sucess, formData } = createDraft();
</script>

<template>
  <div>Sucess : {{ sucess }}</div>
  <div>Pending : {{ pending }}</div>
  <form method="POST" @submit.prevent="creator()">
    <UIInput
      type="text"
      field="name"
      v-model="formData.name"
      @update:model-value="(val) => (formData.name = val)"
      >Name</UIInput
    >
    <UIInput
      type="text"
      field="datauri"
      v-model="formData.datauri"
      @update:model-value="(val) => (formData.datauri = val)"
      >Datauri</UIInput
    >
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>
