<template>
  <td
    :class="[
      'px-6 whitespace-nowrap',
      $props.actions ? 'text-right' : 'py-4 text-sm',
      $props.lead ? 'text-neutral-900' : 'text-neutral-500',
    ]"
  >
    <slot />
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    actions: {
      type: Boolean,
      default: false,
    },
    lead: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
