<template>
  <template v-if="dateTime">
    {{ dateTime }}
  </template>

  <template v-else>
    &mdash;
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { getSlotTextContent, formatDateTimeString } from '@/scripts/utils';

export default defineComponent({
  props: {
    format: {
      type: String,
      default: undefined,
    },
  },

  setup(props, { attrs, slots }) {
    const dateTime = computed(() => {
      const dateTimeString = (attrs.textContent as string | undefined)
        ?? (slots.default && getSlotTextContent(slots.default()));

      return dateTimeString && formatDateTimeString(dateTimeString, props.format);
    });

    return {
      dateTime,
    };
  },
});
</script>
