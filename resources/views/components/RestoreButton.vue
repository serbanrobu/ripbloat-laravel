<template>
  <Button
    color="warning"
    title="Restore"
    icon
  >
    <RefreshIcon class="w-4 h-4" />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from '@/views/components';
import { RefreshIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Button,
    RefreshIcon,
  },
});
</script>
