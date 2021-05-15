<template>
  <FormCardFooter
    submit-text="Update"
    :submitting="$props.updating"
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
    updating: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
