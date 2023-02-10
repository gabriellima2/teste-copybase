<script lang="ts" setup>
  type PokeDetailsProps = {
    name: string;
    value: number;
  };

  const props = defineProps<PokeDetailsProps>();
</script>

<template>
  <li class="poke-stat">
    <h2 class="poke-stat__name" lang="en">{{ props.name }}</h2>
    <p class="poke-stat__value">{{ props.value }}</p>
  </li>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .poke-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .poke-stat__name {
    font-size: 0.9rem;
    text-transform: capitalize;
    opacity: 0.7;
    order: 1;
  }
  .poke-stat__value {
    font-weight: 600;
    font-size: 1rem;
  }
</style>
