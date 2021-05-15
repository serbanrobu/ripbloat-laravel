<template>
  <Input
    type="password"
    placeholder="********"
    class="pl-10"
    :prepend-icon="$options.LockClosedIcon"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from '@/views/components';
import { LockClosedIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    Input,
  },

  LockClosedIcon,
});
</script>
