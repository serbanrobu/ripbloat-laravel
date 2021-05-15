<template>
  <RouterView
    v-if="task"
    :task="task"
  />

  <Loading v-else-if="fetching" />
  <NotFound v-else />
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useTask } from '@/scripts/composables';
import { NotFound, Loading } from '@/views/components';

export default defineComponent({
  components: {
    NotFound,
    Loading,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { id } = toRefs(props);
    const { task, fetching } = useTask(id);

    return { task, fetching };
  },
});
</script>
