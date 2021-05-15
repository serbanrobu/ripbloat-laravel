<template>
  <RouterView
    v-if="user"
    :user="user"
  />

  <Loading v-else-if="fetching" />

  <Container v-else-if="error">
    <div class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon
            class="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>

        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            {{ error.message }}
          </h3>
        </div>
      </div>
    </div>
  </Container>

  <NotFound v-else />
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useUser } from '@/scripts/composables';
import { NotFound, Loading, Container } from '@/views/components';
import { XCircleIcon } from '@heroicons/vue/solid';

export default defineComponent({
  components: {
    NotFound,
    Loading,
    XCircleIcon,
    Container,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { id } = toRefs(props);
    const { user, fetching, error } = useUser(id);

    return { user, fetching, error };
  },
});
</script>
