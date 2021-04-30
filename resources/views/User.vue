<template>
  <RouterView
    v-if="user"
    :user="user"
  />
</template>

<script lang="ts">
import { gql, useQuery } from '@urql/vue';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { data } = useQuery({
      query: gql`
        query($id: ID!) {
          user(id: $id) {
            id
            name
            email
            createdAt
            updatedAt
          }
        }
      `,
      variables: props,
    });

    const user = computed(() => data.value?.user);

    return { user };
  },
});
</script>
