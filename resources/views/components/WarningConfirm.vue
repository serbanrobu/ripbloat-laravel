<template>
  <Confirm
    color="warning"
    :icon="$options.ExclamationIcon"
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
import { ExclamationIcon } from '@heroicons/vue/outline';
import { Confirm } from '@/views/components';

export default defineComponent({
  components: {
    Confirm,
  },

  ExclamationIcon,
});
</script>
