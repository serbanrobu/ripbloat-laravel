<template>
  <Badge
    class="font-mono"
    rounded
  >
    <slot />
  </Badge>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Badge } from '@/views/components';

export default defineComponent({
  components: {
    Badge,
  },
});
</script>
