<template>
  <Button
    color="neutral"
    title="Details"
    icon
  >
    <EyeIcon class="w-4 h-4" />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from '@/views/components';
import { EyeIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Button,
    EyeIcon,
  },
});
</script>
