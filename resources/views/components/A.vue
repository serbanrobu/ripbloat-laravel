<template>
  <BaseButton class="font-semibold text-primary-600">
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BaseButton } from '@/views/components';

export default defineComponent({
  components: {
    BaseButton,
  },
});
</script>
