import { h, FunctionalComponent } from 'vue';

export const Dt: FunctionalComponent = (_, { attrs, slots }) => h(
  'dt',
  { ...attrs, class: ['text-sm font-medium text-neutral-500', attrs.class] },
  slots,
);

export default Dt;
