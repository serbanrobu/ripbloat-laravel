<template>
  <BaseButton
    :color="color"
    :class="[
      `inline-flex justify-center items-center border disabled:opacity-50
      focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-${$props.color}-500`,
      {
        'px-2.5 py-1.5 text-xs rounded':
          xs && (normalizedPrimary || secondary || white),
        'px-3 py-2 text-sm leading-4':
          sm && (normalizedPrimary || secondary || white),
        'px-4 py-2 text-sm rounded-md':
          normalizedMd && (normalizedPrimary || secondary || white),
        'px-4 py-2 text-base rounded-md':
          lg && (normalizedPrimary || secondary || white),
        'px-6 py-3 text-base rounded-md':
          xl && (normalizedPrimary || secondary || white),
        'px-3 py-1.5 text-xs': xs && rounded,
        'px-3.5 py-2 text-sm leading-4': sm && rounded,
        'px-4 py-2 text-sm': normalizedMd && rounded,
        'px-5 py-2 text-base': lg && rounded,
        'px-6 py-3 text-base': xl && rounded,
        'p-1': xs && (circular || icon),
        'p-1.5': sm && (circular || icon),
        'p-2': (normalizedMd || lg) && (circular || icon),
        'p-3': xl && (circular || icon),
        [`border-neutral-300 font-medium shadow-sm text-neutral-700 bg-white
        hover:bg-neutral-50`]: white,
        [`border-transparent font-medium shadow-sm text-white
        bg-${color}-600 hover:bg-${color}-700`]: normalizedPrimary,
        [`border-transparent font-medium text-${color}-700
        bg-${color}-100 hover:bg-${color}-200`]: secondary,
        [`border-transparent font-medium rounded-full shadow-sm text-white
        bg-${color}-600 hover:bg-${color}-700`]: rounded,
        [`border-transparent rounded-full shadow-sm text-white
        bg-${color}-600 hover:bg-${color}-700`]: circular,
        [`rounded-full border-transparent text-${color}-600
        hover:text-${color}-900 hover:bg-${color}-100`]: icon,
      },
    ]"
  >
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { BaseButton } from '@/views/components';

export default defineComponent({
  components: {
    BaseButton,
  },

  props: {
    color: {
      type: String,
      default: 'primary',
    },
    xs: {
      type: Boolean,
      default: false,
    },
    sm: {
      type: Boolean,
      default: false,
    },
    md: {
      type: Boolean,
      default: false,
    },
    lg: {
      type: Boolean,
      default: false,
    },
    xl: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    circular: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const normalizedMd = computed(
      () => props.md || !(props.xs || props.sm || props.lg || props.xl),
    );

    const normalizedPrimary = computed(
      () => props.primary
        || !(
          props.secondary
          || props.white
          || props.rounded
          || props.circular
          || props.icon
        ),
    );

    return {
      normalizedMd,
      normalizedPrimary,
    };
  },
});
</script>
