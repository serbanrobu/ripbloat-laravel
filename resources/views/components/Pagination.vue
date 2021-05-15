<template>
  <div
    v-if="paginatorInfo.total > ($route.query.first ?? 10)"
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6"
  >
    <div class="flex-1 flex justify-between sm:hidden">
      <Button
        :to="
          paginatorInfo.firstItem > 1
            ? { query: getPageQuery(paginatorInfo.currentPage - 1) }
            : undefined
        "
        :disabled="paginatorInfo.firstItem === 1"
        white
      >
        Previous
      </Button>

      <Button
        :to="
          paginatorInfo.lastItem < paginatorInfo.total
            ? {
              query: {
                ...$route.query,
                page: paginatorInfo.currentPage + 1,
              },
            }
            : undefined
        "
        :disabled="paginatorInfo.lastItem === paginatorInfo.total"
        class="ml-3"
        white
      >
        Next
      </Button>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-neutral-700">
          Showing
          <span class="font-medium">{{ paginatorInfo.firstItem }}</span>
          to
          <span class="font-medium">{{ paginatorInfo.lastItem }}</span>
          of
          <span class="font-medium">{{ paginatorInfo.total }}</span>
          results
        </p>
      </div>

      <div class="flex space-x-2">
        <p class="text-sm text-neutral-700">
          Per page

          <select
            v-model="first"
            :class="`ml-1 focus:ring-indigo-500 focus:border-indigo-500 h-full
            py-0 pl-2 pr-7 border-transparent bg-transparent text-neutral-500
            sm:text-sm rounded-md`"
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
            :is="paginatorInfo.firstItem > 1 ? 'RouterLink' : 'a'"
            :to="
              paginatorInfo.firstItem > 1
                ? { query: getPageQuery(paginatorInfo.currentPage - 1) }
                : undefined
            "
            :class="`relative inline-flex items-center px-2 py-2 rounded-l-md
            border border-neutral-300 bg-white text-sm font-medium
            text-neutral-500 hover:bg-neutral-50 focus:z-10 focus:outline-none
            focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`"
          >
            <span class="sr-only">Previous</span>

            <ChevronLeftIcon
              class="h-5 w-5"
              :class="{ 'opacity-50': paginatorInfo.firstItem === 1 }"
              aria-hidden="true"
            />
          </component>

          <template
            v-for="(page, pageIdx) in generatePages(
              paginatorInfo.currentPage,
              paginatorInfo.lastPage
            )"
            :key="pageIdx"
          >
            <RouterLink
              v-if="page"
              :key="pageIdx"
              :to="{ query: getPageQuery(page) }"
              :class="[
                `relative inline-flex items-center px-4 py-2 border
                border-neutral-300 text-sm font-medium text-neutral-700
                focus:z-10 focus:outline-none focus:ring-1
                focus:ring-indigo-500 focus:border-indigo-500`,
                page === paginatorInfo.currentPage
                  ? 'bg-neutral-100'
                  : 'hover:bg-neutral-50',
              ]"
            >
              {{ page }}
            </RouterLink>

            <span
              v-else
              :key="-pageIdx"
              :class="`relative inline-flex items-center px-4 py-2 border
              border-neutral-300 bg-white text-sm font-medium text-neutral-700
              focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500
              focus:border-indigo-500`"
            >
              ...
            </span>
          </template>

          <component
            :is="
              paginatorInfo.lastItem < paginatorInfo.total ? 'RouterLink' : 'a'
            "
            :to="
              paginatorInfo.lastItem < paginatorInfo.total
                ? {
                  query: {
                    ...$route.query,
                    page: paginatorInfo.currentPage + 1,
                  },
                }
                : undefined
            "
            :class="`relative inline-flex items-center px-2 py-2 rounded-r-md
            border border-neutral-300 bg-white text-sm font-medium
            text-neutral-500 hover:bg-neutral-50 focus:z-10 focus:outline-none
            focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`"
          >
            <span class="sr-only">Next</span>

            <ChevronRightIcon
              class="h-5 w-5"
              :class="{ 'opacity-50': paginatorInfo.lastItem === paginatorInfo.total }"
              aria-hidden="true"
            />
          </component>
        </nav>
      </div>
    </div>
  </div>

  <div
    v-else-if="!paginatorInfo.total"
    :class="`bg-white px-4 py-3 flex items-center justify-center border-t
    border-neutral-200 sm:px-6 text-neutral-500`"
  >
    No records found
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { Button } from '@/views/components';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import { useRoute, useRouter } from 'vue-router';

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

export default defineComponent({
  components: {
    Button,
    ChevronLeftIcon,
    ChevronRightIcon,
  },

  props: {
    paginatorInfo: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const first = computed({
      get: () => route.query.first ?? 10,
      set: (val) => {
        const { first: _, ...query } = route.query;

        if (val && val !== 10) {
          query.first = val;
        }

        router.push({ query });
      },
    });

    const getPageQuery = (page: number) => {
      const { page: _, ...query } = route.query;

      if (page !== 1) {
        query.page = page.toString();
      }

      return query;
    };

    return {
      generatePages,
      getPageQuery,
      first,
    };
  },
});
</script>
