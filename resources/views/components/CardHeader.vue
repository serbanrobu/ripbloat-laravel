<template>
  <div class="px-4 py-5 border-b border-neutral-200 sm:px-6">
    <div
      class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap"
    >
      <div class="ml-4 mt-4">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          <slot name="title">
            {{ computedTitle }}
          </slot>
        </h3>

        <p
          v-if="$props.subtitle || $slots.subtitle"
          class="mt-1 text-sm text-gray-500"
        >
          <slot name="subtitle">
            {{ subtitle }}
          </slot>
        </p>
      </div>

      <div class="ml-4 mt-4 flex-shrink-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { startCase } from 'lodash';
import { useRoute } from 'vue-router';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: undefined,
    },
    subtitle: {
      type: String,
      default: undefined,
    },
  },

  setup(props) {
    const route = useRoute();
    const computedTitle = computed(() => props.title ?? startCase(route.name?.toString()));

    return {
      computedTitle,
    };
  },
});
</script>
