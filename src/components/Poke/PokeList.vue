<script lang="ts" setup>
  import { useFetch } from "../../composables/useFetch";

  import BaseLoading from "../Base/BaseLoading.vue";
  import BaseError from "../Base/BaseError.vue";
  import PokeListItem from "./PokeListItem.vue";

  import { pokeServices } from "../../services/poke-service";
  import type { PokemonOverviewDTO } from "../../dtos/pokemon-dtos";

  type PokemonListProps = {
    pokeName: string;
  };

  const props = defineProps<PokemonListProps>();
  const { data, error, isLoading } = useFetch<PokemonOverviewDTO[]>(() =>
    pokeServices.getPokemon(props.pokeName)
  );

  console.log(data);
</script>

<template>
  <section class="poke-container">
    <BaseLoading v-if="isLoading" />
    <div v-else-if="error" class="poke-error">
      <BaseError
        :message="error || 'Ocorreu um erro'"
        :has-go-back-button="true"
        :has-emoji="true"
        :full-screen="true"
      />
    </div>
    <div v-else class="poke-list">
      <h1 class="poke-list__title">
        <span>{{ props.pokeName }}</span> e suas evoluções
      </h1>
      <ol class="poke-list-container">
        <PokeListItem
          v-for="pokemon of data"
          v-bind:key="pokemon.id"
          :pokemon="pokemon"
        />
      </ol>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .poke-container {
    @include center-full-screen(row);
  }
  .poke-error {
    @include flex-center(column);
    gap: 16px;
  }
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
