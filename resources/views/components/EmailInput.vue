<template>
  <Input
    type="email"
    label="Email address"
    placeholder="you@example.com"
    class="pl-10"
    :prepend-icon="$options.MailIcon"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from '@/views/components';
import { MailIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    Input,
  },

  MailIcon,
});
</script>
