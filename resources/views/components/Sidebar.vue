<template>
  <TransitionRoot
    as="template"
    :show="$props.modelValue"
  >
    <Dialog
      as="div"
      static
      class="fixed inset-0 flex z-40 md:hidden"
      :open="$props.modelValue"
      @close="$emit('update:modelValue', false)"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-neutral-600 bg-opacity-75" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-neutral-800">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                class="ml-1 flex items-center justify-center h-10 w-10
                rounded-full focus:outline-none focus:ring-2 focus:ring-inset
                focus:ring-white"
                @click="$emit('update:modelValue', false)"
              >
                <span class="sr-only">Close sidebar</span>

                <XIcon
                  class="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
          </TransitionChild>

          <div class="flex-shrink-0 flex items-center px-4">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              alt="Workflow"
            >
          </div>

          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <nav class="px-2 space-y-1">
              <RouterLink
                v-for="(item, idx) in $props.items"
                :key="idx"
                v-slot="{ isActive, isExactActive, href, navigate }"
                :to="item.to"
                custom
              >
                <a
                  :href="href"
                  :class="[
                    (item.exact ? isExactActive : isActive)
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  ]"
                  @click="navigate"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      (item.exact ? isExactActive : isActive)
                        ? 'text-neutral-300'
                        : 'text-neutral-400 group-hover:text-neutral-300',
                      'mr-4 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />

                  {{ item.name }}
                </a>
              </RouterLink>
            </nav>
          </div>
        </div>
      </TransitionChild>

      <div
        class="flex-shrink-0 w-14"
        aria-hidden="true"
      />
    </Dialog>
  </TransitionRoot>

  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <div class="flex flex-col h-0 flex-1">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-neutral-900">
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow"
          >
        </div>

        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-2 py-4 bg-neutral-800 space-y-1">
            <RouterLink
              v-for="(item, idx) in $props.items"
              :key="idx"
              v-slot="{ isActive, isExactActive, href, navigate }"
              :to="item.to"
              custom
            >
              <a
                :href="href"
                :class="[
                  (item.exact ? isExactActive : isActive)
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-300 hover:bg-neutral-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
                @click="navigate"
              >
                <component
                  :is="item.icon"
                  :class="[
                    (item.exact ? isExactActive : isActive)
                      ? 'text-neutral-300'
                      : 'text-neutral-400 group-hover:text-neutral-300',
                    'mr-3 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />

                {{ item.name }}
              </a>
            </RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { XIcon, HomeIcon, UsersIcon } from '@heroicons/vue/outline';

export default defineComponent({
  components: {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
    XIcon,
  },

  props: {
    modelValue: Boolean,

    items: {
      type: Array,
      default: () => [
        {
          to: '/',
          name: 'Dashboard',
          icon: HomeIcon,
          exact: true,
        },
        {
          to: '/users',
          name: 'Users',
          icon: UsersIcon,
        },
      ],
    },
  },

  emits: ['update:modelValue'],
});
</script>
