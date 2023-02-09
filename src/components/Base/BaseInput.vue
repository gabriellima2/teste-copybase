<script lang="ts" setup>
  type BaseInputProps = {
    modelValue: string;
    className?: string;
    handleKeyDown?: (e: KeyboardEvent) => void;
  };

  type BaseInputEmits = {
    (e: "update:modelValue", value: string): void;
  };

  const props = defineProps<BaseInputProps>();
  const emits = defineEmits<BaseInputEmits>();
</script>

<template>
  <input
    :class="props.className || 'text-input'"
    v-bind="$attrs"
    :value="props.modelValue"
    @keydown="props.handleKeyDown"
    @input="
      emits('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>

<style lang="scss" scoped>
  @import "../../styles/main";
  .text-input {
    @include base-input();
    height: 100%;
  }
</style>
