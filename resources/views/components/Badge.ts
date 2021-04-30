import { h, FunctionalComponent } from 'vue';

const defineBadge = (
  variantClass: string,
) => {
  const component: FunctionalComponent<{ color?: string }> = (props, { attrs, slots }) => h(
    'div',
    {
      ...attrs,
      class: [`inline-flex py-0.5 items-center font-medium' bg-${props.color}-100 text-${props.color}-800`, variantClass, attrs.class],
    },
    slots,
  );

  component.props = {
    color: {
      type: String,
      default: 'primary',
    },
  };

  return component;
};

export const Badge = defineBadge('px-2.5 text-xs rounded-full');

export const LgBadge = defineBadge('px-3 text-sm rounded-full');

export const RoundedBadge = defineBadge('px-2.5 text-xs rounded');

export const LgRoundedBadge = defineBadge('px-3 text-sm rounded');

export default Badge;
