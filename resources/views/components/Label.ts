import { FunctionalComponent, h } from 'vue';

export const Label: FunctionalComponent = (_, { attrs, slots }) => h(
  'label',
  {
    ...attrs,
    class: ['block text-sm font-medium text-neutral-700', attrs.class],
  },
  slots,
);

export default Label;
