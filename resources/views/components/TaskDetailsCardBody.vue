<template>
  <CardBody>
    <dl class="grid grid-cols-2 gap-6">
      <div class="col-span-2">
        <slot name="title">
          <Dt>Title</Dt>
          <Dd>{{ task.title }}</Dd>
        </slot>
      </div>

      <div class="col-span-2">
        <slot name="description">
          <Dt>Description</Dt>

          <Dd class="whitespace-pre">
            {{ task.description }}
          </Dd>
        </slot>
      </div>

      <div class="col-span-2">
        <Dt>Creator</Dt>

        <Dd>
          <A :to="{ name: 'UserDetails', params: { id: task.creator.id } }">
            {{ task.creator.name }}
          </A>
        </Dd>
      </div>

      <div class="col-span-2 lg:col-span-1">
        <Dt>Created At</Dt>

        <Dd>
          <DateTime>{{ task.createdAt }}</DateTime>
        </Dd>
      </div>

      <div class="col-span-2 lg:col-span-1">
        <Dt>Updated At</Dt>

        <Dd>
          <DateTime>{{ task.updatedAt }}</DateTime>
        </Dd>
      </div>
    </dl>
  </CardBody>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  CardBody, Dt, Dd, DateTime, A,
} from '@/views/components';
import { Task } from '@/scripts/composables';

export default defineComponent({
  components: {
    CardBody,
    Dt,
    Dd,
    DateTime,
    A,
  },

  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
});
</script>
