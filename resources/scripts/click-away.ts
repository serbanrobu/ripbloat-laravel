import { Directive } from 'vue';

const clickAway = Symbol('clickAway');

export default {
// eslint-disable-next-line no-unused-vars
  beforeMount(el: HTMLElement & { [clickAway]: (ev: MouseEvent) => void }, binding) {
    // eslint-disable-next-line no-param-reassign
    el[clickAway] = (ev: MouseEvent) => {
      if (!(el === ev.target || el.contains(ev.target as Node))) {
        binding.value(ev, el);
      }
    };

    document.body.addEventListener('click', el[clickAway]);
  },
  unmounted(el) {
    document.body.removeEventListener('click', el[clickAway]);
  },
} as Directive;
