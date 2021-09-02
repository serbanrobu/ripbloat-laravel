<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      >

      <h2 class="mt-6 text-center text-3xl font-extrabold text-neutral-900">
        Sign in to your account
      </h2>

      <p class="mt-2 text-center text-sm text-neutral-600 max-w">
        Or
        <RouterLink
          to="/register"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          sign up for your account
        </RouterLink>
      </p>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          <EmailInput
            v-model="form.email"
            :errors="errors.email"
            required
          />

          <PasswordInput
            v-model="form.password"
            :errors="errors.password"
            required
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              >

              <label
                for="remember-me"
                class="ml-2 block text-sm text-neutral-900"
              >
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            :disabled="fetching"
            class="w-full"
          >
            Sign in
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { loggedIn } from '@/scripts/auth';
import { useRoute, useRouter } from 'vue-router';
import {
  EmailInput, PasswordInput, Button,
} from '@/views/components';
import { notify } from '@/scripts/notifications';
import axios from 'axios';

export default defineComponent({
  components: {
    EmailInput,
    PasswordInput,
    Button,
  },

  setup() {
    const form = {};
    const fetching = ref(false);
    const errors = ref({});
    const router = useRouter();
    const route = useRoute();

    const onSubmit = async () => {
      fetching.value = true;

      try {
        await axios.post('/login', form);
        errors.value = {};
        loggedIn.value = true;
        notify.success('Successfully signed in.');
        router.push(route.query.redirect as string | undefined ?? '/');
      } catch (e) {
        errors.value = e.response.data.errors || {};
      } finally {
        fetching.value = false;
      }
    };

    return {
      loggedIn,
      fetching,
      onSubmit,
      form,
      errors,
    };
  },
});
</script>
