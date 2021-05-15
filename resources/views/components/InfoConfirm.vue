<template>
  <Confirm
    color="info"
    :icon="$options.InformationCircleIcon"
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
import { InformationCircleIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Confirm,
  },

  InformationCircleIcon,
});
</script>
