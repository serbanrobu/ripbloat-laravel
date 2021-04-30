<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      >

      <h2 class="mt-6 text-center text-3xl font-extrabold text-neutral-900">
        Sign up for your account
      </h2>

      <p class="mt-2 text-center text-sm text-neutral-600 max-w">
        Or
        <RouterLink
          to="/login"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          sign in to your account
        </RouterLink>
      </p>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
          <TextField
            v-model="form.name"
            :errors="errors.name"
            label="Name"
            required
          />

          <EmailField
            v-model="form.email"
            :errors="errors.email"
            required
          />

          <PasswordField
            v-model="form.password"
            :errors="errors.password"
            required
          />

          <PasswordField
            v-model="form.password_confirmation"
            :errors="errors.password_confirmation"
            label="Confirm Password"
            required
          />

          <Button
            :disabled="fetching"
            class="w-full"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  TextField, EmailField, PasswordField, Button,
} from '@/views/components';
import axios from 'axios';

export default defineComponent({
  components: {
    TextField,
    EmailField,
    PasswordField,
    Button,
  },

  setup() {
    const form = {};
    const fetching = ref(false);
    const errors = ref({});
    const router = useRouter();

    const onSubmit = async () => {
      fetching.value = true;

      try {
        await axios.post('/register', form);
        router.push('/');
      } catch (e) {
        errors.value = e.data.errors || {};
        fetching.value = false;
      }
    };

    return {
      fetching,
      onSubmit,
      form,
      errors,
    };
  },
});
</script>
