<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import PokeList from "../components/Poke/PokeList.vue";

  const { query } = useRoute();
</script>

<template>
  <PokeList :poke-name="(query.q as string)" />
</template>
