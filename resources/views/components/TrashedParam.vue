<template>
  <div>
    <Label>Trashed</Label>

    <ButtonGroup>
      <ButtonGroupItem
        v-for="item in ['WITHOUT', 'WITH', 'ONLY']"
        :key="item"
        v-model="trashed"
        :value="item"
      >
        {{ item }}
      </ButtonGroupItem>
    </ButtonGroup>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ButtonGroup, ButtonGroupItem, Label } from '@/views/components';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    ButtonGroup,
    ButtonGroupItem,
    Label,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();

    const trashed = computed({
      get: () => route.query.trashed ?? 'WITHOUT',
      set: (val) => {
        const { trashed: _, ...query } = route.query;

        if (val && val !== 'WITHOUT') {
          query.trashed = val;
        }

        router.push({ query });
      },
    });

    return {
      trashed,
    };
  },
});
</script>
