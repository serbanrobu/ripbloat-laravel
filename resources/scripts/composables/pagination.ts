import { gql } from '@urql/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const PaginatorInfoFrag = gql`
  fragment PaginatorInfoFrag on PaginatorInfo {
    currentPage
    firstItem
    lastItem
    lastPage
    total
  }
`;

export function usePagination() {
  const route = useRoute();

  const first = computed(() => {
    const { first: f } = route.query;
    return f ? +f : undefined;
  });

  const page = computed(() => {
    const { page: p } = route.query;
    return p ? +p : undefined;
  });

  return {
    first,
    page,
    PaginatorInfoFrag,
  };
}

export default usePagination;
