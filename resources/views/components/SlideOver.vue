<template>
  <TransitionRoot
    as="template"
    :show="open"
  >
    <Dialog
      as="section"
      static
      class="fixed inset-0 overflow-hidden z-10"
      :open="open"
      @close="open = false"
    >
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0" />

        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <div class="w-screen max-w-md">
              <div
                class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <DialogTitle
                      v-if="title || $slots.title"
                      class="text-lg font-medium text-neutral-900"
                    >
                      <slot name="title">
                        {{ title }}
                      </slot>
                    </DialogTitle>

                    <div class="ml-3 h-7 flex items-center">
                      <button
                        :class="`bg-white rounded-md text-neutral-400
                        hover:text-neutral-500 focus:outline-none focus:ring-2
                        focus:ring-offset-2 focus:ring-indigo-500`"
                        @click="open = false"
                      >
                        <span class="sr-only">Close panel</span>

                        <XIcon
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div class="mt-6 relative flex-1 px-4 sm:px-6">
                  <slot />
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <slot
    name="activator"
    @click="open = true"
  />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },

  props: {
    title: {
      type: String,
      default: undefined,
    },
  },

  setup() {
    const open = ref(false);

    return {
      open,
    };
  },
});
</script>
