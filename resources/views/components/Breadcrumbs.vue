<template>
  <nav
    class="bg-white overflow-x-auto"
    aria-label="Breadcrumb"
  >
    <ol
      class="max-w-screen-xl w-full mx-auto px-4 flex space-x-4 sm:px-6 lg:px-8"
    >
      <li class="flex">
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="text-neutral-400 hover:text-neutral-500"
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
            class="flex-shrink-0 w-6 h-full text-neutral-200"
            viewBox="0 0 24 44"
            preserveAspectRatio="none"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>

          <RouterLink
            v-slot="{ isActive, href, navigate }"
            :to="{ name }"
            custom
          >
            <a
              :href="href"
              class="ml-4 text-sm font-medium"
              :class="
                isActive
                  ? 'text-neutral-400'
                  : 'text-neutral-500 hover:text-neutral-700'
              "
              @click="navigate"
            >
              {{ $options.startCase(name) }}
            </a>
          </RouterLink>
        </div>
      </li>

      <li
        v-for="(value, key) in $route.query"
        :key="key"
        class="flex"
      >
        <div class="flex items-center">
          <Badge
            class="pr-1"
            lg
          >
            <div class="whitespace-nowrap">
              {{ $options.startCase(key) }}: <b>{{ value }}</b>
            </div>

            <RouterLink
              :to="{ query: $options.getQueryWithout($route.query, key) }"
              :class="`flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex
              items-center justify-center text-indigo-400 hover:bg-indigo-200
              hover:text-indigo-500 focus:outline-none focus:bg-indigo-500
              focus:text-white`"
            >
              <svg
                class="h-2 w-2"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 8 8"
              >
                <path
                  stroke-linecap="round"
                  stroke-width="1.5"
                  d="M1 1l6 6m0-6L1 7"
                />
              </svg>
            </RouterLink>
          </Badge>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { HomeIcon } from '@heroicons/vue/solid';
import { startCase } from 'lodash';
import { Badge } from '@/views/components';
import { LocationQueryRaw } from 'vue-router';

export default defineComponent({
  components: {
    HomeIcon,
    Badge,
  },

  props: {
    pages: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },

  startCase,

  getQueryWithout(query: LocationQueryRaw, key: string) {
    const { [key]: _, ...q } = query;
    return q;
  },
});
</script>
