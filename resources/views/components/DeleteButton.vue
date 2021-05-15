<template>
  <Button
    color="danger"
    title="Delete"
    icon
  >
    <TrashIcon class="w-4 h-4" />
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from '@/views/components';
import { TrashIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Button,
    TrashIcon,
  },
});
</script>
