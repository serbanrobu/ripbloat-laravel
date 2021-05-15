<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      :class="`max-w-sm w-full bg-white shadow-lg rounded-lg
      pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`"
    >
      <div class="p-4">
        <div
          class="flex"
          :class="description ? 'items-start' : 'items-center'"
        >
          <div
            v-if="icon"
            class="flex-shrink-0"
          >
            <component
              :is="icon"
              :class="`h-6 w-6 text-${color}-400`"
              aria-hidden="true"
            />
          </div>

          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-medium text-neutral-900">
              <template v-if="typeof message === 'string'">
                {{ message }}
              </template>

              <component
                :is="message"
                v-else
              />
            </p>

            <p
              v-if="description"
              class="mt-1 text-sm text-neutral-500"
            >
              <template v-if="typeof description === 'string'">
                {{ description }}
              </template>

              <component
                :is="description"
                v-else
              />
            </p>
          </div>

          <div
            v-if="dismissible"
            class="ml-4 flex-shrink-0 flex"
          >
            <button
              :class="`bg-white rounded-md inline-flex text-neutral-400
              hover:text-neutral-500 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-indigo-500`"
              @click="show = false"
            >
              <span class="sr-only">Close</span>

              <XIcon
                class="h-5 w-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  FunctionalComponent,
  watchEffect,
} from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/outline';
import { XIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    CheckCircleIcon,
    XIcon,
  },

  props: {
    message: {
      type: [String, Function],
      required: true,
    },
    description: {
      type: [String, Function],
      default: undefined,
    },
    icon: {
      type: Function as PropType<FunctionalComponent>,
      default: undefined,
    },
    color: {
      type: String,
      default: 'primary',
    },
    timeout: {
      type: Number,
      default: 4000,
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const show = ref(true);

    watchEffect(() => {
      if (props.timeout < 0) {
        return;
      }

      setTimeout(() => {
        show.value = false;
      }, props.timeout);
    });

    return {
      show,
    };
  },
});
</script>
