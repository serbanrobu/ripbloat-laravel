<template>
  <RouterView />

  <Teleport to="#notifications">
    <Notification
      v-for="(notification, idx) in notifications"
      :key="idx"
      v-bind="notification"
    />
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Notification } from '@/views/components';
import { notifications } from '@/scripts/notifications';

export default defineComponent({
  components: {
    Notification,
  },

  setup() {
    return {
      notifications,
    };
  },
});
</script>
