<script setup>
const { finder, pending, sucess, drafts } = useDraft();
finder();
</script>

<template>
  <ul>
    <NuxtLink to="/editor/create"> CREATE </NuxtLink>
  </ul>
  <ul class="flex flex-wrap bg-cyan-950 text-gray-50">
    <CardDraft
      v-for="draft in drafts"
      :key="draft._id"
      :link="'/editor/saved/' + draft._id"
      :url="draft.url"
      :title="draft.name"
    ></CardDraft>
  </ul>
</template>
