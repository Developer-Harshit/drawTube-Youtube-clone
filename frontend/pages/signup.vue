<template>
  SIGNUP
  <div>USER: {{ user }}</div>
  <form method="POST" @submit.prevent="submitForm('sign')">
    <div>
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        v-model="formData.name"
      />
    </div>
    <div>
      <label for="userhandle">Handle</label>
      <input
        type="text"
        name="userhandle"
        id="userhandle"
        v-model="formData.handle"
      />
    </div>
    <div>
      <label for="password">Password</label>
      <input
        type="text"
        name="password"
        id="password"
        v-model="formData.password"
      />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>
<script setup>
const { submitForm, pending, sucess, formData } = useAuth();
const user = useUser();
</script>
