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
    padding: 0px 12px;
  }

  @media screen and (min-width: $md-screen) {
    .content {
      @include center-full-screen(row);
      min-height: 700px;
    }
  }
</style>
