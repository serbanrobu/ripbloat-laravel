import { FunctionalComponent, h } from 'vue';
import {
  Label, EmailInput, PasswordInput, TextInput,
} from '@/views/components';
import { generateId } from '@/scripts/utils';

const Field: FunctionalComponent<{
  required?: boolean;
  label?: string;
  errors?: string[];
}> = (props, { attrs, slots }) => {
  const id = attrs.id ?? generateId();
  const label = h(Label, { for: id }, () => props.label);

  return h('div', [
    props.required
      ? label
      : h('div', { class: 'flex justify-between' }, [
        label,
        h('span', { class: 'text-sm text-neutral-500' }, 'Optional'),
      ]),
    slots.default?.({
      ...attrs,
      id,
      required: props.required,
      invalid: !!props.errors?.length,
      class: ['mt-1', attrs.class],
    }),
    props.errors?.map((e) => h('p', { class: 'mt-2 text-sm text-red-600' }, e)),
  ]);
};

Field.props = {
  required: Boolean,
  label: String,
  errors: Array,
};

export const TextField: FunctionalComponent = (_, { attrs }) => h(Field, attrs, {
  default: (defaultProps: any) => h(TextInput, defaultProps),
});

export const EmailField: FunctionalComponent<{ label: string }> = (
  props,
  { attrs },
) => h(
  Field,
  { label: props.label, ...attrs },
  {
    default: (defaultProps: any) => h(EmailInput, defaultProps),
  },
);

EmailField.props = {
  label: {
    type: String,
    default: 'Email address',
  },
};

export const PasswordField: FunctionalComponent<{ label: string }> = (
  props,
  { attrs },
) => h(
  Field,
  { label: props.label, ...attrs },
  {
    default: (defaultProps: any) => h(PasswordInput, defaultProps),
  },
);

PasswordField.props = {
  label: {
    type: String,
    default: 'Password',
  },
};
