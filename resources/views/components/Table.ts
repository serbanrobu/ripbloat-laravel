import { h, FunctionalComponent } from 'vue';

export const Thead: FunctionalComponent = (_, { attrs, slots }) => h(
  'thead',
  { ...attrs, class: ['bg-neutral-50', attrs.class] },
  slots,
);

export const Tr: FunctionalComponent<{ even?: boolean }> = (
  props,
  { attrs, slots },
) => h(
  'tr',
  {
    ...attrs,
    class: [props.even ? 'bg-white' : 'bg-neutral-50', attrs.class],
  },
  slots,
);

Tr.props = {
  even: Boolean,
};

export const Th: FunctionalComponent = (_, { attrs, slots }) => h(
  'th',
  {
    scope: 'col',
    ...attrs,
    class: [
      'px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider',
      attrs.class,
    ],
  },
  slots,
);

export const Td: FunctionalComponent = (_, { attrs, slots }) => h(
  'td',
  {
    ...attrs,
    class: [
      'px-6 py-4 whitespace-nowrap text-sm text-neutral-500',
      attrs.class,
    ],
  },
  slots,
);

export const Table: FunctionalComponent<{ items: [] }> = (
  props,
  { attrs, slots, emit },
) => h(
  'div',
  { class: 'overflow-x-auto sm:-mx-6 lg:-mx-8' },
  h(
    'div',
    { class: 'align-middle inline-block min-w-full sm:px-6 lg:px-8' },
    h(
      'table',
      {
        ...attrs,
        class: ['min-w-full divide-y divide-neutral-200', attrs.class],
      },
      slots.default ?? [
        h(Thead, slots.header),
        h(
          'tbody',
          props.items?.map((item, index) => h(
            Tr,
            {
              key: index,
              even: index % 2 === 0,
              onDblclick: (e: MouseEvent) => emit('dblclick:item', item, e),
            },
            () => slots.item?.({ item, index }),
          )),
        ),
      ],
    ),
  ),
);

export default Table;
