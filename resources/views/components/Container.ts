import { FunctionalComponent, h } from 'vue';

export const Container: FunctionalComponent = (_, { slots }) => h(
  'div',
  { class: 'px-4 py-12 max-w-7xl mx-auto sm:px-6 lg:px-8' },
  slots,
);

export default Container;
