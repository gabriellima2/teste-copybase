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
      :message="error || 'Ocorreu um erro'"
      :has-go-back-button="true"
      :has-emoji="true"
      :full-screen="true"
    />
  </div>
  <PokeList
    v-else-if="data"
    :poke-name="(query.q as string)"
    :pokemons="data"
  />
</template>

<style lang="scss" scoped>
  @import "../styles/main";

  .poke-error {
    @include flex-center(column);
    gap: 16px;
  }
</style>
