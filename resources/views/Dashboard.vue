<template>
  <Container>
    <SectionHeading />

    <div class="border-4 border-dashed border-neutral-200 rounded-lg h-96 p-5" />
  </Container>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import {
  Container, SectionHeading,
} from '@/views/components';

export default defineComponent({
  components: {
    Container,
    SectionHeading,
  },
});
</script>
