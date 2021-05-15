<template>
  <CardBody>
    <dl class="grid grid-cols-2 gap-6">
      <div class="col-span-2 lg:col-span-1">
        <slot name="name">
          <Dt>Name</Dt>
          <Dd>{{ user.name }}</Dd>
        </slot>
      </div>

      <div class="col-span-2 lg:col-span-1">
        <slot name="email">
          <Dt>Email address</Dt>
          <Dd>{{ user.email }}</Dd>
        </slot>
      </div>

      <div class="col-span-2 lg:col-span-1">
        <Dt>Created At</Dt>

        <Dd>
          <DateTime>{{ user.createdAt }}</DateTime>
        </Dd>
      </div>

      <div class="col-span-2 lg:col-span-1">
        <Dt>Updated At</Dt>

        <Dd>
          <DateTime>{{ user.updatedAt }}</DateTime>
        </Dd>
      </div>

      <div
        v-if="user.deletedAt"
        class="col-span-2 lg:col-span-1"
      >
        <Dt>Deleted At</Dt>

        <Dd>
          <DateTime>
            {{ user.deletedAt }}
          </DateTime>
        </Dd>
      </div>
    </dl>
  </CardBody>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  CardBody, Dt, Dd, DateTime,
} from '@/views/components';
import { User } from '@/scripts/composables';

export default defineComponent({
  components: {
    CardBody,
    Dt,
    Dd,
    DateTime,
  },

  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
});
</script>
