<template>
  <Input
    placeholder="Search"
    class="pl-10"
    :prepend-icon="$options.SearchIcon"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from '@/views/components';
import { SearchIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    Input,
  },

  SearchIcon,
});
</script>
