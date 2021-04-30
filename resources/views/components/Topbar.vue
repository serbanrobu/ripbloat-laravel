<template>
  <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
    <button
      class="px-4 border-r border-neutral-200 text-neutral-500 focus:outline-none
      focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      @click="$emit('open-sidebar')"
    >
      <span class="sr-only">Open sidebar</span>

      <MenuAlt2Icon
        class="h-6 w-6"
        aria-hidden="true"
      />
    </button>

    <div class="flex-1 px-4 flex justify-between">
      <div class="flex-1 flex">
        <form
          class="w-full flex md:ml-0"
          action="#"
          method="GET"
        >
          <label
            for="search_field"
            class="sr-only"
          >
            Search
          </label>

          <div class="relative w-full text-neutral-400 focus-within:text-neutral-600">
            <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <SearchIcon
                class="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <input
              id="search_field"
              class="block w-full h-full pl-8 pr-3 py-2 border-transparent
              text-neutral-900 placeholder-neutral-500 focus:outline-none
              focus:placeholder-neutral-400 focus:ring-0 focus:border-transparent
              sm:text-sm"
              placeholder="Search"
              type="search"
              name="search"
            >
          </div>
        </form>
      </div>

      <div class="ml-4 flex items-center md:ml-6">
        <button
          class="bg-white p-1 rounded-full text-neutral-400 hover:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-indigo-500"
        >
          <span class="sr-only">View notifications</span>

          <BellIcon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>

        <Menu
          as="div"
          class="ml-3 relative"
        >
          <div>
            <MenuButton
              class="max-w-xs bg-white flex items-center text-sm rounded-full
              focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
            >
              <span class="sr-only">Open user menu</span>

              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              >
            </MenuButton>
          </div>

          <Transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="origin-top-right absolute right-0 mt-2 w-48 rounded-md
              shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5
              focus:outline-none"
            >
              <MenuItem
                v-for="item in items"
                :key="item.name"
                v-slot="{ active }"
              >
                <BaseButton
                  :to="item.to"
                  :href="item.href"
                  :class="[
                    { 'bg-neutral-100': active },
                    'cursor-pointer block w-full text-left px-4 py-2 text-sm text-neutral-700',
                  ]"
                  @click="item.onClick"
                >
                  {{ item.name }}
                </BaseButton>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { BellIcon, MenuAlt2Icon } from '@heroicons/vue/outline';
import { SearchIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';
import { BaseButton } from '@/views/components';
import axios from 'axios';
import { loggedIn } from '@/scripts/auth';

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    SearchIcon,
    BellIcon,
    MenuAlt2Icon,
    BaseButton,
  },

  emits: ['open-sidebar'],

  setup() {
    const router = useRouter();

    const onSignOut = async () => {
      await axios.post('/logout');
      loggedIn.value = false;
      router.push('/login');
    };

    const items = [
      { name: 'Your Profile', to: '/profile' },
      { name: 'Settings', href: '#' },
      { name: 'Sign out', onClick: onSignOut },
    ];

    return {
      onSignOut,
      items,
    };
  },
});
</script>
