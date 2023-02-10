<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import BaseButton from "./Base/BaseButton.vue";
  import BaseInput from "./Base/BaseInput.vue";

  type SearchBarProps = {
    className?: string;
  };

  const props = defineProps<SearchBarProps>();
  const searchValue = ref("");
  const router = useRouter();

  function handleSubmit() {
    const formattedSearchValue = searchValue.value.trim().toLowerCase();
    if (!formattedSearchValue) return;
    router.push({ path: "/result", query: { q: formattedSearchValue } });
  }

  function handleKeyDown({ key }: KeyboardEvent) {
    if (key === "Enter") return handleSubmit();
  }
</script>

<template>
  <form :class="props.className">
    <slot></slot>
    <div class="container">
      <label>
        <BaseInput
          v-model="searchValue"
          title="Campo de pesquisa"
          placeholder="Pesquisar"
          :handle-key-down="handleKeyDown"
          class="container__field"
        />
      </label>
      <BaseButton type="submit" title="Pesquisar" @click.prevent="handleSubmit">
        🔎
      </BaseButton>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  @import "../styles/main";
  .container {
    @include flex-center(row);
    @include base-input();
    width: fit-content;
    padding: 0px;
  }
  .container__field {
    border: none;
    padding: 10px;
    border-radius: 0px;
  }
</style>
