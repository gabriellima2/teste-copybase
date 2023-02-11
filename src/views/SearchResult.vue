<script lang="ts" setup>
  import { useRoute } from "vue-router";

  import { useFetch } from "../composables/useFetch";

  import BaseLoading from "../components/Base/BaseLoading.vue";
  import BaseError from "../components/Base/BaseError.vue";
  import PokeList from "../components/Poke/PokeList.vue";

  import { pokeServices } from "../services/poke-service";
  import type { PokemonOverviewDTO } from "../dtos/pokemon-dtos";

  const { query } = useRoute();
  const { data, error, isLoading } = useFetch<PokemonOverviewDTO[]>(() =>
    pokeServices.getAll((query.q as string).toLocaleLowerCase())
  );
</script>

<template>
  <BaseLoading v-if="isLoading" />
  <div v-else-if="error" class="poke-error">
    <BaseError
      :message="error"
      :has-go-back-button="true"
      :has-emoji="true"
      :full-screen="true"
    />
  </div>
  <div v-else-if="data" class="search-result-content">
    <PokeList :poke-name="(query.q as string)" :pokemons="data" />
  </div>
</template>

<style lang="scss" scoped>
  @import "../styles/main";
  .search-result-content {
    padding-top: 32px;
    padding-bottom: 32px;
  }
  .poke-error {
    @include flex-center(column);
    gap: 16px;
  }

  @media screen and (min-width: $md-screen) {
    .search-result-content {
      max-width: 1300px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
  }
</style>
