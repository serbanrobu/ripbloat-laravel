<template>
  <component :is="$props.as ?? ($attrs.to ? 'RouterLink' : $attrs.href ? 'a' : 'button')">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    as: {
      type: String,
      default: undefined,
    },
  },
});
</script>
