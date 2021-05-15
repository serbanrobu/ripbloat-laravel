import { computed } from 'vue';
import { useRoute } from 'vue-router';

export type Trashed = 'ONLY' | 'WITH' | 'WITHOUT';

export function useTrashed() {
  const route = useRoute();
  return computed(() => route.query.trashed as Trashed | undefined);
}
