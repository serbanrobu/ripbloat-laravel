import { gql } from '@urql/vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

type SortOrder = 'ASC' | 'DESC';
type OrderByClause = { column: string, order: SortOrder };

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

  const orderBy = computed<OrderByClause[] | undefined>(() => (route.query.sortBy
    ? [{ column: route.query.sortBy as string, order: route.query.sortDesc ? 'DESC' : 'ASC' }]
    : undefined));

  return {
    first, page, orderBy, PaginatorInfoFrag,
  };
}

export default usePagination;
