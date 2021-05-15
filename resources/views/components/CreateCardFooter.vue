<template>
  <FormCardFooter
    submit-text="Create"
    :submitting="$props.creating"
  >
    <slot />
  </FormCardFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormCardFooter } from '@/views/components';

export default defineComponent({
  components: {
    FormCardFooter,
  },

  props: {
    creating: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
