import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useSearch() {
  const route = useRoute();
  const router = useRouter();

  watch(
    () => route.query.search,
    (s) => {
      if (s) {
        const { orderBy: _, order, ...query } = route.query;
        router.push({ query });
      }
    },
    { immediate: true },
  );

  return computed({
    get: () => route.query.search as string | undefined,
    set: (val) => {
      const { search, ...query } = route.query;

      if (val) {
        query.search = val;
      }

      router.push({ query });
    },
  });
}

export default useSearch;
