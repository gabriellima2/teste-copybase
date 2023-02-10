<template>
  <button class="base-button" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .base-button {
    text-decoration: none;
    color: $font-color;
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    background: none;
    border: none;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: $detail-color;
    }
  }
</style>
