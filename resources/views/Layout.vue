<template>
  <div class="h-screen flex overflow-hidden bg-neutral-100">
    <Sidebar v-model="sidebarOpen" />

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <Topbar @open-sidebar="sidebarOpen = true" />

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <Suspense>
          <RouterView />
        </Suspense>
      </main>

      <RouterView name="Breadcrumbs" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Sidebar from '@/views/components/Sidebar.vue';
import Topbar from '@/views/components/Topbar.vue';

export default defineComponent({
  components: {
    Topbar,
    Sidebar,
  },

  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
});
</script>
