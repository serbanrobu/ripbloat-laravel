import { FunctionalComponent, h } from 'vue';
import { MailIcon, LockClosedIcon } from '@heroicons/vue/solid';

const Input: FunctionalComponent<{
  invalid?: boolean;
  color?: string;
  modelValue?: string;
}> = (props, { attrs, emit }) => {
  const color = props.color ?? 'primary';

  return h('input', {
    ...attrs,
    value: props.modelValue,
    class: [
      'block w-full shadow-sm sm:text-sm rounded-md',
      props.invalid
        ? 'focus:ring-danger-500 focus:border-danger-500 placeholder-danger-300 text-danger-900 border-danger-300'
        : `focus:ring-${color}-500 focus:border-${color}-500 border-neutral-300`,
      attrs.class,
    ],
    onInput: (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement | null)?.value),
  });
};

Input.props = {
  invalid: Boolean,
  color: String,
  modelValue: String,
};

export const TextInput: FunctionalComponent = (_, { attrs }) => h(Input, { type: 'text', ...attrs });

export const EmailInput: FunctionalComponent = (_, { attrs }) => h('div', { class: 'relative' }, [
  h(
    'div',
    {
      class:
          'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    },
    h(MailIcon, { class: 'h-5 w-5 text-neutral-400' }),
  ),
  h(Input, {
    type: 'email',
    placeholder: 'you@example.com',
    ...attrs,
    class: ['pl-10', attrs.class],
  }),
]);

export const PasswordInput: FunctionalComponent = (_, { attrs }) => h('div', { class: 'relative' }, [
  h(
    'div',
    {
      class:
          'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none',
    },
    h(LockClosedIcon, { class: 'h-5 w-5 text-neutral-400' }),
  ),
  h(Input, {
    type: 'password',
    placeholder: '********',
    ...attrs,
    class: ['pl-10', attrs.class],
  }),
]);
