import { h, FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { EyeIcon, TrashIcon, PencilIcon } from '@heroicons/vue/outline';

export const BaseButton: FunctionalComponent = (_, { attrs, slots }) => {
  let component: any;

  if (attrs.to) {
    component = RouterLink;
  } else {
    component = attrs.href ? 'a' : 'button';
  }

  return h(component, attrs, slots);
};

const getBaseClass = (color: string) => `inline-flex justify-center items-center border disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500`;

const defineButton = (getVariantClass: (color: string) => string) => (
  sizeClass: string,
) => {
  const Button: FunctionalComponent<{ color: string }> = (
    props,
    { attrs, slots },
  ) => h(
    BaseButton,
    {
      ...attrs,
      class: [
        getBaseClass(props.color),
        getVariantClass(props.color),
        sizeClass,
        attrs.class,
      ],
    },
    slots,
  );

  Button.props = {
    color: {
      type: String,
      default: 'primary',
    },
  };

  return Button;
};

const xsBoxClass = 'px-2.5 py-1.5 text-xs rounded';
const smBoxClass = 'px-3 py-2 text-sm leading-4';
const mdBoxClass = 'px-4 py-2 text-sm rounded-md';
const lgBoxClass = 'px-4 py-2 text-base rounded-md';
const xlBoxClass = 'px-6 py-3 text-base rounded-md';

const definePrimaryButton = defineButton(
  (color) => `border-transparent font-medium shadow-sm text-white bg-${color}-600 hover:bg-${color}-700`,
);

export const XsButton = definePrimaryButton(xsBoxClass);
export const SmButton = definePrimaryButton(smBoxClass);
export const MdButton = definePrimaryButton(mdBoxClass);
export const LgButton = definePrimaryButton(lgBoxClass);
export const XlButton = definePrimaryButton(xlBoxClass);
export const Button = MdButton;

const defineSecondaryButton = defineButton(
  (color: string) => `border-transparent font-medium text-${color}-700 bg-${color}-100 hover:bg-${color}-200`,
);

export const XsSecondaryButton = defineSecondaryButton(xsBoxClass);
export const SmSecondaryButton = defineSecondaryButton(smBoxClass);
export const MdSecondaryButton = defineSecondaryButton(mdBoxClass);
export const LgSecondaryButton = defineSecondaryButton(lgBoxClass);
export const XlSecondaryButton = defineSecondaryButton(xlBoxClass);
export const SecondaryButton = MdSecondaryButton;

const defineWhiteButton = defineButton(
  () => 'border-neutral-300 font-medium shadow-sm text-neutral-700 bg-white hover:bg-neutral-50',
);

export const XsWhiteButton = defineWhiteButton(xsBoxClass);
export const SmWhiteButton = defineWhiteButton(smBoxClass);
export const MdWhiteButton = defineWhiteButton(mdBoxClass);
export const LgWhiteButton = defineWhiteButton(lgBoxClass);
export const XlWhiteButton = defineWhiteButton(xlBoxClass);
export const WhiteButton = MdWhiteButton;

const defineRoundButton = defineButton(
  (color) => `border-transparent font-medium rounded-full shadow-sm text-white bg-${color}-600 hover:bg-${color}-700`,
);

export const XsRoundButton = defineRoundButton('px-3 py-1.5 text-xs');
export const SmRoundButton = defineRoundButton('px-3.5 py-2 text-sm leading-4');
export const MdRoundButton = defineRoundButton('px-4 py-2 text-sm');
export const LgRoundButton = defineRoundButton('px-5 py-2 text-base');
export const XlRoundButton = defineRoundButton('px-6 py-3 text-base');
export const RoundButton = MdRoundButton;

const defineCircularButton = defineButton(
  (color) => `border-transparent rounded-full shadow-sm text-white bg-${color}-600 hover:bg-${color}-700`,
);

export const XsCircularButton = defineCircularButton('p-1');
export const SmCircularButton = defineCircularButton('p-1.5');
export const MdCircularButton = defineCircularButton('p-2');
export const LgCircularButton = defineCircularButton('p-2');
export const XlCircularButton = defineCircularButton('p-3');
export const CircularButton = MdCircularButton;

const defineIconButton = (
  icon: FunctionalComponent,
  color = 'neutral',
): FunctionalComponent => (_, { attrs }) => h(
  BaseButton,
  {
    ...attrs,
    class: [
      getBaseClass(color),
      `p-1.5 rounded-full border-transparent text-${color}-600 hover:text-${color}-900 hover:bg-${color}-100`,
      attrs.class,
    ],
  },
  () => h(icon, { class: 'w-4 h-4' }),
);

export const ShowButton = defineIconButton(EyeIcon);
export const DeleteButton = defineIconButton(TrashIcon, 'danger');
export const EditButton = defineIconButton(PencilIcon, 'primary');

export default Button;
