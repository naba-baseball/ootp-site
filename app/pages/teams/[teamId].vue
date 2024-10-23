<script setup lang="ts">
const { data } = await useFetch(`/api/teams/${useRoute().params.teamId}`);
</script>

<template>
  <h1>team: {{ data?.name }} {{ data?.nickname }}</h1>
</template>
