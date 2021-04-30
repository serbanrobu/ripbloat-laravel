<template>
  <nav
    class="bg-white"
    aria-label="Breadcrumb"
  >
    <ol class="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8">
      <li class="flex">
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="text-gray-400 hover:text-gray-500"
          >
            <HomeIcon
              class="flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />

            <span class="sr-only">Home</span>
          </RouterLink>
        </div>
      </li>

      <li
        v-for="name in [...$props.pages, $route.name]"
        :key="name"
        class="flex"
      >
        <div class="flex items-center">
          <svg
            class="flex-shrink-0 w-6 h-full text-gray-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>

          <span
            v-if="$route.name === name"
            class="ml-4 text-sm font-medium text-gray-400"
          >
            {{ $options.startCase(name) }}
          </span>

          <RouterLink
            v-else
            :to="{ name }"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {{ $options.startCase(name) }}
          </RouterLink>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { HomeIcon } from '@heroicons/vue/solid';
import { startCase } from 'lodash';

export const Breadcrumbs = defineComponent({
  components: {
    HomeIcon,
  },

  props: {
    pages: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  startCase,
});

export default Breadcrumbs;
</script>
