<template>
  <template v-if="date">
    {{ date }}
  </template>

  <template v-else>
    &mdash;
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getSlotTextContent, formatDateString } from '@/scripts/utils';

export default defineComponent({
  props: {
    format: {
      type: String,
      default: undefined,
    },
  },

  setup(props, { attrs, slots }) {
    const date = computed(() => {
      const dateString = (attrs.textContent as string | undefined)
        ?? (slots.default && getSlotTextContent(slots.default()));

      return dateString && formatDateString(dateString, props.format);
    });

    return {
      date,
    };
  },
});
</script>
