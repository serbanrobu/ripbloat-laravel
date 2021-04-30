<template>
  <div
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <WhiteButton
        :to="
          $props.paginatorInfo.firstItem > 1
            ? {
              query: {
                ...$route.query,
                page: $props.paginatorInfo.currentPage - 1,
              },
            }
            : undefined
        "
        :disabled="$props.paginatorInfo.firstItem === 1"
      >
        Previous
      </WhiteButton>

      <WhiteButton
        :to="
          $props.paginatorInfo.lastItem < $props.paginatorInfo.total
            ? {
              query: {
                ...$route.query,
                page: $props.paginatorInfo.currentPage + 1,
              },
            }
            : undefined
        "
        :disabled="$props.paginatorInfo.lastItem === $props.paginatorInfo.total"
        class="ml-3"
      >
        Next
      </WhiteButton>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-neutral-700">
          Showing
          <span class="font-medium">{{ $props.paginatorInfo.firstItem }}</span>
          to
          <span class="font-medium">{{ $props.paginatorInfo.lastItem }}</span>
          of
          <span class="font-medium">{{ $props.paginatorInfo.total }}</span>
          results
        </p>
      </div>

      <div class="flex space-x-2">
        <p class="text-sm text-neutral-700">
          Per page

          <select
            :value="$route.query.first ?? 10"
            class="ml-1 focus:ring-indigo-500 focus:border-indigo-500 h-full py-0
            pl-2 pr-7 border-transparent bg-transparent text-neutral-500
            sm:text-sm rounded-md"
            @change="$router.push({ query: { ...$route.query, first: $event.target.value } })"
          >
            <option
              v-for="item in [10, 20, 30, 50, 80, 100]"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </p>

        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <component
            :is="$props.paginatorInfo.firstItem > 1 ? 'RouterLink' : 'a'"
            :to="
              $props.paginatorInfo.firstItem > 1
                ? {
                  query: {
                    ...$route.query,
                    page: $props.paginatorInfo.currentPage - 1,
                  },
                }
                : undefined
            "
            class="relative inline-flex items-center px-2 py-2 rounded-l-md
            border border-neutral-300 bg-white text-sm font-medium text-neutral-500
            hover:bg-neutral-50"
          >
            <span class="sr-only">Previous</span>

            <ChevronLeftIcon
              class="h-5 w-5"
              aria-hidden="true"
            />
          </component>

          <template
            v-for="(page, pageIdx) in $options.generatePages(
              $props.paginatorInfo.currentPage,
              $props.paginatorInfo.lastPage
            )"
            :key="pageIdx"
          >
            <RouterLink
              v-if="page"
              :key="pageIdx"
              :to="{ query: { ...$route.query, page } }"
              class="relative inline-flex items-center px-4 py-2 border
              border-neutral-300 bg-white text-sm font-medium text-neutral-700"
              :class="
                page === $props.paginatorInfo.currentPage ? 'bg-neutral-50' : 'hover:bg-neutral-50'
              "
            >
              {{ page }}
            </RouterLink>

            <span
              v-else
              :key="-pageIdx"
              class="relative inline-flex items-center px-4 py-2 border
              border-neutral-300 bg-white text-sm font-medium text-neutral-700"
            >
              ...
            </span>
          </template>

          <component
            :is="
              $props.paginatorInfo.lastItem < $props.paginatorInfo.total
                ? 'RouterLink'
                : 'a'
            "
            :to="
              $props.paginatorInfo.lastItem < $props.paginatorInfo.total
                ? {
                  query: {
                    ...$route.query,
                    page: $props.paginatorInfo.currentPage + 1,
                  },
                }
                : undefined
            "
            class="relative inline-flex items-center px-2 py-2 rounded-r-md
            border border-neutral-300 bg-white text-sm font-medium text-neutral-500
            hover:bg-neutral-50"
          >
            <span class="sr-only">Next</span>

            <ChevronRightIcon
              class="h-5 w-5"
              aria-hidden="true"
            />
          </component>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WhiteButton } from '@/views/components';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';

export function generatePages(currentPage: number, lastPage: number) {
  const center: number[] = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];

  const filteredCenter = center.filter((p) => p > 1 && p < lastPage);
  const includeThreeLeft = currentPage === 5;
  const includeThreeRight = currentPage === lastPage - 4;
  const includeLeftDots = currentPage > 5;
  const includeRightDots = currentPage < lastPage - 4;

  if (includeThreeLeft) {
    filteredCenter.unshift(2);
  }

  if (includeThreeRight) {
    filteredCenter.push(lastPage - 1);
  }

  if (includeLeftDots) {
    filteredCenter.unshift(0);
  }

  if (includeRightDots) {
    filteredCenter.push(0);
  }

  return [1, ...filteredCenter, lastPage];
}

export const Pagination = defineComponent({
  components: {
    WhiteButton,
    ChevronLeftIcon,
    ChevronRightIcon,
  },

  props: {
    paginatorInfo: {
      type: Object,
      required: true,
    },
  },

  generatePages,
});

export default Pagination;
</script>
