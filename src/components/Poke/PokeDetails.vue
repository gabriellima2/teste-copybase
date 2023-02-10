<script lang="ts" setup>
  import { computed } from "vue";

  import PokeStat from "../Poke/PokeStat.vue";
  import type { PokemonDetailsDTO } from "../../dtos/pokemon-dtos";

  type PokeDetailsProps = {
    pokemon: PokemonDetailsDTO;
  };

  const props = defineProps<PokeDetailsProps>();
  const formattedWeight = computed(() => `${props.pokemon.weight / 10} Kg`);
  const formattedHeight = computed(() => `${props.pokemon.height * 10} CM`);
</script>

<template>
  <div class="poke-content">
    <section class="poke-overview">
      <img
        :src="props.pokemon.sprites.front_default"
        :alt="`Pokemon ${props.pokemon.name}`"
        class="poke-overview__image"
      />

      <div class="poke-texts">
        <h1 class="poke-texts__name">
          {{ props.pokemon.name }}
        </h1>
        <footer class="poke-complementary-info">
          <small class="poke-complementary-info__text">
            {{ formattedHeight }}
          </small>
          <small class="poke-complementary-info__text">
            {{ formattedWeight }}
          </small>
        </footer>
      </div>
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
  .poke-texts {
    @include flex-center(column);
    gap: 8px;
  }
  .poke-texts__name {
    text-transform: capitalize;
    font-weight: 600;
  }
  .poke-complementary-info {
    @include flex-center(row);
    flex-wrap: wrap;
    gap: 12px;
  }
  .poke-complementary-info__text {
    opacity: 0.8;
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
  }
  .poke-stats__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 40px;
  }
</style>
