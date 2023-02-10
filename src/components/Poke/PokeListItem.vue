<script lang="ts" setup>
  import { RouterLink } from "vue-router";
  import type { PokemonOverviewDTO } from "../../dtos/pokemon-dtos";

  type PokeListItemProps = {
    pokemon: PokemonOverviewDTO;
  };

  const props = defineProps<PokeListItemProps>();
</script>

<template>
  <li class="list">
    <RouterLink
      :to="{ name: 'Details', params: { id: props.pokemon.name } }"
      class="poke-list-item"
      :title="`Ver mais detalhes de ${props.pokemon.name}`"
    >
      <img
        :src="props.pokemon.sprites.front_default"
        :alt="`Pokemon ${props.pokemon.name}`"
        class="poke-list-item__image"
      />
      <div class="poke-text">
        <span class="poke-text__number">#{{ props.pokemon.id }}</span>
        <h2 class="poke-text__name">
          {{ props.pokemon.name }}
        </h2>
      </div>
    </RouterLink>
  </li>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .list {
    flex-basis: 200px;
  }
  .poke-list-item {
    @include flex-center(column);
    gap: 8px;
    padding: 24px 16px;
    border-radius: 8px;
    background-color: $brand-color-800;
    flex: 1;

    &:hover,
    &:focus {
      opacity: 1;
      text-decoration: none;
      background-color: $detail-color;
    }
  }
  .poke-list-item__image {
    max-width: 100px;
    max-height: 100px;
  }
  .poke-text {
    @include flex-center(row);
    gap: 4px;
  }
  .poke-text__number {
    font-weight: 600;
  }
  .poke-text__name {
    font-size: 1rem;
    text-transform: capitalize;
  }
</style>
