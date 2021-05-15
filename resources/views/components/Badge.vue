<template>
  <div
    :class="[
      `inline-flex py-0.5 items-center font-medium bg-${$props.color}-100
      text-${$props.color}-800`,
      $props.rounded ? 'rounded' : 'rounded-full',
      $props.lg ? 'px-3 text-sm' : 'px-2.5 text-xs',
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    lg: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
