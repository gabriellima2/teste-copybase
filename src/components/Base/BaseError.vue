<script lang="ts" setup>
  import { useRouter } from "vue-router";
  import BaseButton from "./BaseButton.vue";

  type BaseErrorProps = {
    message: string;
    hasGoBackButton?: boolean;
    hasEmoji?: boolean;
  };

  const props = defineProps<BaseErrorProps>();
  const router = useRouter();
</script>

<template>
  <h1 class="error" role="alert">
    <span v-if="props.hasEmoji">😞</span> {{ props.message }}
  </h1>
  <BaseButton
    v-if="props.hasGoBackButton"
    @click="router.go(-1)"
    type="button"
    title="Voltar para página anterior"
    >&#9664; Voltar</BaseButton
  >
</template>

<style lang="scss" scoped>
  .error {
    font-size: 1.2rem;
    font-weight: 500;
  }
</style>
