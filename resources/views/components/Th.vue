<template>
  <th
    scope="col"
    :class="`px-6 py-3 text-xs font-medium text-neutral-500 uppercase
    tracking-wider whitespace-nowrap`"
  >
    <Order
      v-if="$props.order"
      :column="typeof $props.order === 'string' ? $props.order : undefined"
    >
      <slot />
    </Order>

    <slot v-else />
  </th>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Order } from '@/views/components';

export default defineComponent({
  components: {
    Order,
  },

  props: {
    column: {
      type: String,
      default: undefined,
    },

    order: {
      type: [Boolean, String],
      default: undefined,
    },
  },
});
</script>
