import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export type SortOrder = 'ASC' | 'DESC';
export type OrderByClause<Column = string> = { column: Column; order: SortOrder };

export function useOrderBy<Column = OrderByClause['column']>() {
  const route = useRoute();
  const router = useRouter();

  watch(
    () => route.query.orderBy,
    (s) => {
      if (s) {
        const { search: _, ...query } = route.query;
        router.push({ query });
      }
    },
  );

  return computed<OrderByClause<Column>[] | undefined>(
    () => {
      const column = route.query.orderBy as Column | null;

      return column
        ? [
          {
            column,
            order: (route.query.order ?? 'ASC') as SortOrder,
          },
        ]
        : undefined;
    },
  );
}

export default useOrderBy;
