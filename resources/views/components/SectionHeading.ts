import { h, FunctionalComponent } from 'vue';
import { useRoute } from 'vue-router';
import startCase from 'lodash.startcase';

export const SectionHeading: FunctionalComponent<{
  title: string | null;
  subtitle: string | null;
}> = (props, { attrs, slots }) => {
  const route = useRoute();
  const title = props.title ?? slots.title?.() ?? startCase(route.name?.toString());
  const subtitle = props.subtitle ?? slots.subtitle?.();

  return h(
    'div',
    {
      ...attrs,
      class: ['pb-5 sm:flex sm:items-center sm:justify-between', attrs.class],
    },
    [
      h('div', [
        h(
          'h3',
          { class: 'text-lg leading-6 font-medium text-neutral-900' },
          title,
        ),
        subtitle && h('p', { class: 'text-sm text-neutral-500' }, subtitle),
      ]),
      h('div', { class: 'mt-3 sm:mt-0 sm:ml-4' }, slots.actions?.()),
    ],
  );
};

SectionHeading.props = {
  title: {
    type: String,
    default: null,
  },
  subtitle: {
    type: String,
    default: null,
  },
};

export default SectionHeading;
