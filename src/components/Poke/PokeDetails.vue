<script lang="ts" setup>
  import PokeStat from "../Poke/PokeStat.vue";
  import type { PokemonDetailsDTO } from "../../dtos/pokemon-dtos";

  type PokeDetailsProps = {
    pokemon: PokemonDetailsDTO;
  };

  const props = defineProps<PokeDetailsProps>();
</script>

<template>
  <div class="poke-content">
    <section class="poke-overview">
      <img
        :src="props.pokemon.sprites.front_default"
        :alt="`Pokemon ${props.pokemon.name}`"
        class="poke-overview__image"
      />

      <h1 class="poke-overview__name">{{ props.pokemon.name }}</h1>
    </section>
    <section class="poke-stats">
      <h1 class="poke-stats__title">Estatísticas</h1>
      <ul class="poke-stats__list">
        <PokeStat
          v-for="pokemonStat in props.pokemon.stats"
          :name="pokemonStat.stat.name"
          :value="pokemonStat.base_stat"
          :key="pokemonStat.stat.name"
        />
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .poke-content {
    @include flex-center(row);
    align-items: stretch;
    flex-wrap: wrap;
    width: 100%;
  }
  .poke-overview {
    @include flex-center(column);
    justify-content: flex-end;
    gap: 16px;
    flex-basis: 400px;
    padding: 32px;
    border-radius: 8px;
    background-color: $brand-color-800;
  }
  .poke-overview__image {
    width: 130px;
    height: 130px;
  }
  .poke-overview__name {
    text-transform: capitalize;
    font-weight: 600;
  }
  .poke-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-basis: 400px;
    padding: 32px;
    border: 1px solid $brand-color-800;
  }
  .poke-stats__title {
    font-size: 1.2rem;
    font-weight: 500;
  }
  .poke-stats__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 40px;
  }
</style>
