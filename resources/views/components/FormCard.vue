<template>
  <form @submit.prevent="$emit('submit', $event)">
    <Card>
      <slot />
    </Card>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card } from '@/views/components';

export default defineComponent({
  components: {
    Card,
  },

  emits: ['submit'],
});
</script>
