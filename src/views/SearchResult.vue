<script lang="ts" setup>
  import { useRoute } from "vue-router";

  const { query } = useRoute();
</script>

<template>
  <h1>{{ query.q }}</h1>
</template>
