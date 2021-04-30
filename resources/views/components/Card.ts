import { startCase } from 'lodash';
import { FunctionalComponent, h } from 'vue';
import { useRoute } from 'vue-router';

export const CardHeader: FunctionalComponent<{
  title?: string;
  subtitle?: string;
}> = (props, { attrs, slots }) => {
  const route = useRoute();
  const title = props.title ?? slots.title ?? startCase(route.name?.toString());
  const subtitle = props.subtitle ?? slots.subtitle?.();

  return h(
    'div',
    { ...attrs, class: ['bg-white px-4 py-5 border-b border-neutral-200 sm:px-6', attrs.class] },
    h(
      'div',
      { class: '-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap' },
      [
        h('div', { class: 'ml-4 mt-4' }, [
          h(
            'h3',
            { class: 'text-lg leading-6 font-medium text-neutral-900' },
            title,
          ),
          subtitle && h('p', { class: 'mt-1 text-sm text-neutral-500' }, subtitle),
        ]),
        slots.default
        && h('div', { class: 'ml-4 mt-4 flex-shrink-0' }, slots.default()),
      ],
    ),
  );
};

CardHeader.props = {
  title: String,
  subtitle: String,
};

export const CardBody: FunctionalComponent = (_, { attrs, slots }) => h(
  'div',
  { ...attrs, class: ['px-4 py-5 bg-white sm:px-6', attrs.class] },
  slots,
);

export const CardFooter: FunctionalComponent = (_, { attrs, slots }) => h(
  'div',
  {
    ...attrs,
    class: ['px-4 py-3 bg-neutral-50 text-right sm:px-6', attrs.class],
  },
  slots,
);

export const Card: FunctionalComponent = (_, { attrs, slots }) => h(
  'div',
  {
    ...attrs,
    class: ['shadow overflow-hidden sm:rounded-md', attrs.class],
  },
  slots,
);

export default Card;
