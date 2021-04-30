import { h, FunctionalComponent } from 'vue';

export const Dd: FunctionalComponent = (_, { attrs, slots }) => h(
  'dd',
  { ...attrs, class: ['mt-1 text-sm text-neutral-900', attrs.class] },
  slots,
);

export default Dd;
