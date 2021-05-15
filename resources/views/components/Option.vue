<template>
  <ListboxOption
    v-slot="{ active, selected }"
    as="template"
    :value="$props.value"
  >
    <li
      :class="[
        active ? 'text-white bg-indigo-600' : 'text-neutral-900',
        'cursor-default select-none relative py-2 pl-3 pr-9',
      ]"
    >
      <span
        :class="[
          selected ? 'font-semibold' : 'font-normal',
          'block truncate',
        ]"
      >
        <slot>
          {{ $props.value }}
        </slot>
      </span>

      <span
        v-if="selected"
        :class="[
          active ? 'text-white' : 'text-indigo-600',
          'absolute inset-y-0 right-0 flex items-center pr-4',
        ]"
      >
        <CheckIcon
          class="h-5 w-5"
          aria-hidden="true"
        />
      </span>
    </li>
  </ListboxOption>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ListboxOption } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    ListboxOption,
    CheckIcon,
  },

  props: {
    value: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
  },
});
</script>
