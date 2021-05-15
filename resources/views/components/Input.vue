<template>
  <div>
    <template v-if="$props.label">
      <div
        v-if="$props.optional"
        class="flex justify-between"
      >
        <Label @click="$options.onLabelClick">
          {{ $props.label }}
        </Label>

        <span class="text-sm text-neutral-500">Optional</span>
      </div>

      <Label @click="$refs.input.focus()">
        {{ $props.label }}
      </Label>
    </template>

    <div
      class="relative"
      :class="{ 'mt-1': $props.label }"
    >
      <div
        v-if="$props.prependIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <component
          :is="$props.prependIcon"
          class="h-5 w-5 text-neutral-400"
        />
      </div>

      <component
        :is="$props.tag"
        ref="input"
        :type="$props.tag === 'input' ? 'text' : undefined"
        :value="$props.modelValue"
        class="block w-full shadow-sm sm:text-sm rounded-md"
        :class="
          $props.errors?.length
            ? `focus:ring-danger-500 focus:border-danger-500 placeholder-danger-300
          text-danger-900 border-danger-300`
            : `focus:ring-${$props.color}-500 focus:border-${$props.color}-500
          border-neutral-300`
        "
        v-bind="$attrs"
        @input="$emit('update:model-value', $event.target.value)"
      />
    </div>

    <p
      v-for="(error, idx) in $props.errors"
      :key="idx"
      class="mt-2 text-sm text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Label } from '@/views/components';

export default defineComponent({
  components: {
    Label,
  },

  inheritAttrs: false,

  props: {
    tag: {
      type: String,
      default: 'input',
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    prependIcon: {
      type: Function,
      default: undefined,
    },
    color: {
      type: String,
      default: 'primary',
    },
    optional: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: undefined,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['update:model-value'],
});
</script>
