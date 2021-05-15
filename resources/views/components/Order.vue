<template>
  <RouterLink
    :to="{ query }"
    class="group hover:text-neutral-900"
  >
    <slot />

    <component
      :is="icon"
      class="inline h-4 w-4 -mt-1 -ml-1 transition duration-300 fade"
      :class="{ 'opacity-0 group-hover:opacity-40': !active }"
    />
  </RouterLink>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/vue/outline';
import { getSlotTextContent } from '@/scripts/utils';
import { snakeCase } from 'lodash';
import { useRoute } from 'vue-router';

export default defineComponent({
  props: {
    column: {
      type: String,
      default: undefined,
    },
  },

  setup(props, { slots }) {
    const route = useRoute();

    const column = computed(
      () => props.column
        ?? snakeCase(
          slots.default && getSlotTextContent(slots.default()),
        ).toUpperCase(),
    );

    const active = computed(() => route.query.orderBy === column.value);

    const query = computed(() => {
      const q = { ...route.query };

      if (active.value) {
        if (route.query.order === 'DESC') {
          delete q.orderBy;
          delete q.order;
        } else {
          q.order = 'DESC';
        }
      } else {
        q.orderBy = column.value;
      }

      return q;
    });

    const icon = computed(() => (active.value && route.query.order === 'DESC'
      ? ArrowSmDownIcon
      : ArrowSmUpIcon));

    return {
      icon,
      query,
      active,
    };
  },
});
</script>
