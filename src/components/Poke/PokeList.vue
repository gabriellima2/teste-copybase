<script lang="ts" setup>
  import { useFetch } from "../../composables/useFetch";

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
  <h1 v-if="isLoading">Carregando...</h1>
  <h1 v-else-if="error">{{ error }}</h1>
  <div v-else>
    <ul>
      <li v-for="pokemon of data" v-bind:key="pokemon.id">
        <h1>{{ pokemon.name }}</h1>
      </li>
    </ul>
  </div>
</template>
