<template>
  <Confirm
    color="success"
    :icon="$options.CheckCircleIcon"
  >
    <template
      v-for="(slot, name) in $slots"
      #[name]="props"
    >
      <slot
        :name="name"
        v-bind="props"
      />
    </template>
  </Confirm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Confirm } from '@/views/components';
import { CheckCircleIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Confirm,
  },

  CheckCircleIcon,
});
</script>
