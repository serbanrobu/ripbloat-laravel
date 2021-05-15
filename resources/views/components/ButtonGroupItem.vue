<template>
  <button
    type="button"
    :class="[
      `relative inline-flex items-center px-4 py-2 border border-neutral-300
      text-sm font-medium text-neutral-700 focus:z-10 focus:outline-none
      focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`,
      $props.modelValue === $props.value
        ? 'bg-neutral-100'
        : 'hover:bg-neutral-50',
    ]"
    @click="$emit('update:model-value', $props.value)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: [Object, Number, String, Boolean],
      default: undefined,
    },
    value: {
      type: [Object, Number, String, Boolean],
      default: true,
    },
  },
  emits: ['update:model-value'],
});
</script>

<style lang="scss" scoped>
button {
  &:first-child {
    @apply rounded-l-md;
  }

  &:not(first-child) {
    @apply -ml-px;
  }

  &:last-child {
    @apply rounded-r-md;
  }
}
</style>
