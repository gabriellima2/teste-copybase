<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import BaseError from "../components/Base/BaseError.vue";
  import BaseLoading from "../components/Base/BaseLoading.vue";
  import PokeDetails from "../components/Poke/PokeDetails.vue";
  import { useFetch } from "../composables/useFetch";
  import { pokeServices } from "../services/poke-service";

  const { params } = useRoute();
  const { data, error, isLoading } = useFetch(() =>
    pokeServices.getByName(params.id as string)
  );
</script>

<template>
  <BaseLoading v-if="isLoading" />
  <div v-else-if="error" class="poke-error">
    <BaseError
      :message="error || 'Ocorreu um erro'"
      :has-go-back-button="true"
      :has-emoji="true"
      :full-screen="true"
    />
  </div>
  <article v-else-if="data" class="poke-container">
    <PokeDetails :pokemon="data" />
  </article>
</template>

<style lang="scss" scoped>
  @import "../styles/main";
  .poke-container {
    width: 100%;
  }
  .poke-error {
    @include flex-center(column);
    gap: 16px;
  }
</style>
