<template>
  LOGIN
  <div>USER: {{ user }}</div>
  <form method="POST" @submit.prevent="submitForm('log')">
    <UIInput
      type="text"
      field="userhandle"
      v-model="formData.handle"
      @update:model-value="(val) => (formData.handle = val)"
    >
      Handle
    </UIInput>
    <UIInput
      type="password"
      field="password"
      v-model="formData.password"
      @update:model-value="(val) => (formData.password = val)"
    >
      Password
    </UIInput>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>
<script setup>
const { submitForm, pending, sucess, formData } = useAuth();
const user = useUser();
</script>
