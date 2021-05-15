<template>
  <Listbox
    :model-value="$props.modelValue"
    as="div"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <ListboxLabel
      v-if="$props.label"
      class="block text-sm font-medium text-neutral-700"
    >
      {{ $props.label }}
    </ListboxLabel>

    <div class="mt-1 relative">
      <ListboxButton
        :class="`bg-white relative w-full border border-neutral-300 rounded-md
        shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none
        focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`"
        style="height: 38px"
      >
        <span class="block truncate">
          {{ $props.modelValue }}
        </span>

        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon
            class="h-5 w-5 text-neutral-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="`absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60
          rounded-md py-1 text-base ring-1 ring-black ring-opacity-5
          overflow-auto focus:outline-none sm:text-sm`"
        >
          <slot />
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOptions,
} from '@headlessui/vue';
import { SelectorIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOptions,
    SelectorIcon,
  },

  props: {
    modelValue: {
      type: [String, Number, Boolean, Object],
      default: null,
    },

    label: {
      type: String,
      default: undefined,
    },
  },

  emits: ['update:model-value'],
});
</script>
