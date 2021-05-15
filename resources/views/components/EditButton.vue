<template>
  <Button
    title="Edit"
    icon
  >
    <PencilIcon class="w-4 h-4" />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from '@/views/components';
import { PencilIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Button,
    PencilIcon,
  },
});
</script>
