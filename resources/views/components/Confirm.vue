<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="div"
      static
      class="fixed z-10 inset-0 overflow-y-auto"
      :open="open"
      @close="open = false"
    >
      <div
        :class="`flex items-end justify-center min-h-screen pt-4 px-4 pb-20
        text-center sm:block sm:p-0`"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            :class="`inline-block align-bottom bg-white rounded-lg text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8
            sm:align-middle sm:max-w-lg sm:w-full`"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  v-if="icon"
                  :class="`mx-auto flex-shrink-0 flex items-center
                  justify-center h-12 w-12 rounded-full bg-${color}-100 sm:mx-0
                  sm:h-10 sm:w-10`"
                >
                  <component
                    :is="icon"
                    :class="`h-6 w-6 text-${color}-600`"
                    aria-hidden="true"
                  />
                </div>

                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    v-if="title"
                    as="h3"
                    class="text-lg leading-6 font-medium text-neutral-900"
                  >
                    {{ title }}
                  </DialogTitle>

                  <div class="mt-2">
                    <p class="text-sm text-neutral-500">
                      <slot />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <Button
                type="button"
                :color="color"
                class="w-full sm:w-auto sm:ml-3"
                @click="
                  open = false;
                  $emit('confirm');
                "
              >
                {{ confirmText }}
              </Button>

              <button
                ref="cancelButtonRef"
                type="button"
                :class="`mt-3 w-full inline-flex justify-center rounded-md
                border border-neutral-300 shadow-sm px-4 py-2 bg-white
                text-base font-medium text-neutral-700 hover:bg-neutral-50
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`"
                @click="open = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <slot
    name="activator"
    @click="open = true"
  />
</template>

<script lang="ts">
import {
  defineComponent, ref, FunctionalComponent, PropType,
} from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Button } from '@/views/components';

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Button,
  },

  props: {
    title: {
      type: String,
      default: undefined,
    },
    confirmText: {
      type: String,
      default: 'Confirm',
    },
    icon: {
      type: Function as PropType<FunctionalComponent>,
      default: undefined,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },

  emits: ['confirm'],

  setup() {
    const open = ref(false);

    return { open };
  },
});
</script>
