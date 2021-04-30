import { h, FunctionalComponent } from 'vue';
import { Badge } from '@/views/components';

export const Id: FunctionalComponent = (_, { attrs, slots }) => h(
  Badge,
  { ...attrs, class: ['font-mono', attrs.class] },
  slots,
);

export default Id;
