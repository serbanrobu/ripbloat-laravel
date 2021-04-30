import { h, FunctionalComponent } from 'vue';
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/vue/solid';
import { LocationQuery, RouterLink, useRoute } from 'vue-router';
import { snakeCase } from 'lodash';

export const Sort: FunctionalComponent<{ by?: string }> = (
  props,
  { attrs, slots },
) => {
  const defaultSlot = slots.default?.();

  const sortBy = props.by
    ?? snakeCase((attrs.textContent ?? defaultSlot?.[0].children) as string).toUpperCase();

  const route = useRoute();
  const newQuery: LocationQuery = { ...route.query };
  const active = route.query.sortBy === sortBy;

  if (active && !route.query.sortDesc) {
    newQuery.sortDesc = '1';
  } else {
    delete newQuery.sortDesc;
  }

  if (active && route.query.sortDesc) {
    delete newQuery.sortBy;
  } else {
    newQuery.sortBy = sortBy;
  }

  const icon = active && route.query.sortDesc ? ArrowSmDownIcon : ArrowSmUpIcon;

  return h(RouterLink, { ...attrs, to: { query: newQuery }, class: 'group' }, () => [
    defaultSlot,
    h(icon, {
      class: [
        'inline h-4 w-4 -mt-1 transition duration-300 fade',
        { 'opacity-0 group-hover:opacity-40': !active },
      ],
    }),
  ]);
};

Sort.props = {
  by: String,
};

export default Sort;
