<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <CardHeader title="Update password" />

      <CardBody>
        <div class="grid grid-cols-2 gap-6">
          <div class="col-span-2">
            <PasswordField
              v-model="form.current_password"
              :errors="errors['current_password']"
              label="Current password"
              required
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <PasswordField
              v-model="form.password"
              :errors="errors['password']"
              label="New password"
              required
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <PasswordField
              v-model="form.password_confirmation"
              :errors="errors['password_confirmation']"
              label="Password confirmation"
              required
            />
          </div>
        </div>
      </CardBody>

      <CardFooter>
        <WhiteButton
          type="button"
          @click="reset"
        >
          Reset
        </WhiteButton>

        <Button
          :disabled="fetching"
          class="ml-3"
        >
          Update
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  Card, CardHeader, CardBody, CardFooter, WhiteButton, Button, PasswordField,
} from '@/views/components';
import axios from 'axios';
import loggedIn from '@/scripts/auth';
import { notify } from '@/scripts/notifications';

export default defineComponent({
  components: {
    Card, CardHeader, CardBody, CardFooter, WhiteButton, Button, PasswordField,
  },

  props: {
    userId: {
      type: String,
      required: true,
    },
  },

  setup() {
    const form = ref();
    const fetching = ref(false);
    const errors = ref();

    const reset = () => {
      form.value = { current_password: '', password: '', password_confirmation: '' };
      errors.value = {};
    };

    reset();

    const onSubmit = async () => {
      fetching.value = true;

      try {
        await axios.put('/user/password', form.value);
        errors.value = {};
        loggedIn.value = true;
        notify.success('Your password was successfully updated.');
      } catch (e) {
        errors.value = e.response.data.errors || {};
      } finally {
        fetching.value = false;
      }
    };

    return {
      form,
      errors,
      onSubmit,
      fetching,
      reset,
    };
  },
});
</script>
