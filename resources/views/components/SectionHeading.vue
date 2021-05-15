<template>
  <div class="pb-5 sm:flex sm:items-center sm:justify-between">
    <div>
      <h3 class="text-lg leading-6 font-medium text-neutral-900">
        <slot name="title">
          {{ computedTitle }}
        </slot>
      </h3>

      <p
        v-if="$props.subtitle || $slots.subtitle"
        class="text-sm text-neutral-500"
      >
        <slot name="subtitle">
          {{ $props.subtitle }}
        </slot>
      </p>
    </div>

    <div class="mt-3 sm:mt-0 sm:ml-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import startCase from 'lodash.startcase';

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
