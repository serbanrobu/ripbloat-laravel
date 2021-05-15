<template>
  <SearchInput v-model="search" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { SearchInput } from '@/views/components';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';

export default defineComponent({
  components: {
    SearchInput,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const search = computed({
      get: () => route.query.search as string | undefined,
      set: debounce((val) => {
        const { search: _, ...query } = route.query;

        if (val) {
          query.search = val;
        }

        router.push({ query });
      }, 200),
    });

    return {
      search,
    };
  },
});
</script>
