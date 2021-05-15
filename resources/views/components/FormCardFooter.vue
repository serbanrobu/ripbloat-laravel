<template>
  <CardFooter>
    <slot />

    <Button
      v-if="$attrs.onReset"
      type="button"
      white
      @click="$attrs.onReset"
    >
      Reset
    </Button>

    <Button
      :disabled="$props.submitting"
      class="ml-3"
    >
      {{ $props.submitText }}
    </Button>
  </CardFooter>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CardFooter, Button } from '@/views/components';

export default defineComponent({
  components: {
    Button,
    CardFooter,
  },

  props: {
    submitText: {
      type: String,
      default: 'Submit',
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
