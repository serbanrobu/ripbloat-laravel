<template>
  <Container v-if="authUser">
    <FormCard @submit="onSubmit">
      <CardHeader>
        <template #subtitle>
          <Id>{{ authUser.id }}</Id>
        </template>

        <DangerConfirm
          title="Delete account"
          confirm-text="Delete"
          @confirm="onDelete"
        >
          Are you sure you want to delete your account?

          <template #activator="props">
            <Button
              v-bind="props"
              type="button"
              color="danger"
              secondary
            >
              Delete
            </Button>
          </template>
        </DangerConfirm>
      </CardHeader>

      <UserDetailsCardBody :user="authUser">
        <template #name>
          <Input
            v-model="form.name"
            :errors="errors.name"
            label="Name"
            required
          />
        </template>

        <template #email>
          <EmailInput
            v-model="form.email"
            :errors="errors.email"
            required
          />
        </template>
      </UserDetailsCardBody>

      <EditCardFooter v-bind="{ onReset, updating }" />
    </FormCard>

    <UpdatePasswordForm
      v-if="authUser"
      :user-id="authUser.id"
      class="mt-10"
    />
  </Container>

  <Loading v-else-if="fetching" />
  <NotFound v-else />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import {
  Container,
  CardHeader,
  DangerConfirm,
  Button,
  Input,
  EmailInput,
  FormCard,
  EditCardFooter,
  Id,
  Loading,
  NotFound,
} from '@/views/components';
import UserDetailsCardBody from '@/views/components/UserDetailsCardBody.vue';
import { notify } from '@/scripts/notifications';
import { useRouter } from 'vue-router';
import { loggedIn } from '@/scripts/auth';
import {
  useAuthUser,
  useUpdateUser,
  useDeleteUser,
} from '@/scripts/composables';
import UpdatePasswordForm from '@/views/components/UpdatePasswordForm.vue';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    UserDetailsCardBody,
    DangerConfirm,
    Button,
    Input,
    EmailInput,
    UpdatePasswordForm,
    FormCard,
    EditCardFooter,
    Id,
    Loading,
    NotFound,
  },

  setup() {
    const router = useRouter();
    const { authUser, fetching } = useAuthUser();
    const form = ref();

    const { updateUser, updating, errors } = useUpdateUser();

    const onReset = () => {
      const { name, email } = authUser.value ?? {};
      form.value = { name, email };
      errors.value = {};
    };

    watchEffect(onReset);

    const onSubmit = async () => {
      const { id } = authUser.value!;
      const { error } = await updateUser({ id, ...form.value! });

      if (error) {
        return;
      }

      notify.success('Your profile was successfully updated.');
    };

    const { deleteUser } = useDeleteUser();

    const onDelete = async () => {
      const { id } = authUser.value!;
      const { error } = await deleteUser({ id });

      if (error) {
        notify.danger(error.message, { timeout: -1 });
        return;
      }

      loggedIn.value = false;
      router.push('/login');
    };

    return {
      authUser,
      errors,
      form,
      onReset,
      onSubmit,
      fetching,
      updating,
      onDelete,
    };
  },
});
</script>
