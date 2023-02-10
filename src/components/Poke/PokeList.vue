<script lang="ts" setup>
  import PokeListItem from "./PokeListItem.vue";
  import type { PokemonOverviewDTO } from "../../dtos/pokemon-dtos";

  type PokemonListProps = {
    pokeName: string;
    pokemons: PokemonOverviewDTO[];
  };

  const props = defineProps<PokemonListProps>();
</script>

<template>
  <article class="poke-list">
    <h1 class="poke-list__title">
      <span>{{ props.pokeName }}</span> e suas evoluções
    </h1>
    <ol class="poke-list-container">
      <PokeListItem
        v-for="pokemon of props.pokemons"
        v-bind:key="pokemon.id"
        :pokemon="pokemon"
      />
    </ol>
  </article>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";

  .poke-list {
    @include flex-center(column);
    width: 100%;
    gap: 32px;
  }
  .poke-list__title {
    font-size: 1.4rem;
    font-weight: 500;

    & > span {
      text-transform: capitalize;
    }
  }
  .poke-list-container {
    @include flex-center(row);
    width: 100%;
    gap: 32px;
    flex-wrap: wrap;
  }
</style>
