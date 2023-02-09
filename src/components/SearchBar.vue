<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import BaseInput from "./Base/BaseInput.vue";

  type SearchBarProps = {
    className?: string;
  };

  const props = defineProps<SearchBarProps>();
  const searchValue = ref("");
  const router = useRouter();

  function handleSubmit() {
    const formattedSearchValue = searchValue.value.trim();
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
      <button
        type="submit"
        title="Pesquisar"
        @click.prevent="handleSubmit"
        class="container__search-button"
      >
        🔎
      </button>
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
  .container__search-button {
    text-decoration: none;
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
