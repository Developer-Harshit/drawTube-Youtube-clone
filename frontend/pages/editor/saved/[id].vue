<script setup>
const { finder, pending, sucess, drafts } = useDraft();
const id = useRoute().params.id;

onMounted(() => {
  finder(id);
});
</script>

<template>
  <div>id: {{ $route.params.id }}</div>
  <div>Pending: {{ pending }}</div>
  <div>Sucess: {{ sucess }}</div>
  <div>Data: {{ drafts }}</div>
</template>
