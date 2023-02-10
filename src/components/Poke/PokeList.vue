<script lang="ts" setup>
  import { useFetch } from "../../composables/useFetch";

  import BaseLoading from "../Base/BaseLoading.vue";
  import BaseError from "../Base/BaseError.vue";

  import { pokeServices } from "../../services/poke-service";
  import type { PreviewPokeDTO } from "../../dtos/preview-poke-dto";

  type PokemonListProps = {
    pokeName: string;
  };

  const props = defineProps<PokemonListProps>();
  const { data, error, isLoading } = useFetch<PreviewPokeDTO[]>(() =>
    pokeServices.getPokemon(props.pokeName)
  );
</script>

<template>
  <div class="poke-list">
    <BaseLoading v-if="isLoading" />
    <div v-else-if="error" class="poke-list__error">
      <BaseError
        :message="error || 'Ocorreu um erro'"
        :has-go-back-button="true"
        :has-emoji="true"
        :full-screen="true"
      />
    </div>
    <div v-else>
      <ul>
        <li v-for="pokemon of data" v-bind:key="pokemon.id">
          <h1>{{ pokemon.name }}</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .poke-list {
    @include center-full-screen(row);
  }
  .poke-list__error {
    @include flex-center(column);
    gap: 16px;
  }
</style>
