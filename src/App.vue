<script setup lang="ts">
  import { RouterView } from "vue-router";
</script>

<template>
  <main class="content">
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
  @import "./styles/main";
  .content {
    @include center-full-screen(column);
    padding: 0px 12px;
  }
</style>
