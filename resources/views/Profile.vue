<template>
  <Container>
    <form @submit.prevent="onSubmit">
      <Card v-if="user">
        <CardHeader>
          <template #subtitle>
            <Id>{{ user.id }}</Id>
          </template>

          <DangerConfirm
            title="Delete account"
            action-text="Delete"
            @confirm="onDelete"
          >
            Are you sure you want to delete your account?

            <template #activator="props">
              <SecondaryButton
                v-bind="props"
                type="button"
                color="danger"
              >
                Delete
              </SecondaryButton>
            </template>
          </DangerConfirm>
        </CardHeader>

        <CardBody>
          <dl class="grid grid-cols-2 gap-6">
            <div class="col-span-2 lg:col-span-1">
              <TextField
                v-model="form.name"
                :errors="errors['input.name']"
                label="Name"
                required
              />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <EmailField
                v-model="form.email"
                :errors="errors['input.email']"
                required
              />
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
          </dl>
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

    <UpdatePasswordForm
      v-if="user"
      :user-id="user.id"
      class="mt-10"
    />
  </Container>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, watchEffect,
} from 'vue';
import {
  Container,
  CardHeader,
  CardBody,
  Card,
  Dt,
  Dd,
  Id,
  DateTime,
  DangerConfirm,
  SecondaryButton,
  TextField,
  EmailField,
  WhiteButton,
  Button,
  CardFooter,
} from '@/views/components';
import { notify } from '@/scripts/notifications';
import { gql, useMutation, useQuery } from '@urql/vue';
import { useRouter } from 'vue-router';
import { loggedIn } from '@/scripts/auth';
import { useErrors } from '@/scripts/composables';
import UpdatePasswordForm from '@/views/components/UpdatePasswordForm.vue';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    CardBody,
    Card,
    Dt,
    Dd,
    Id,
    DateTime,
    DangerConfirm,
    SecondaryButton,
    TextField,
    EmailField,
    WhiteButton,
    Button,
    CardFooter,
    UpdatePasswordForm,
  },

  setup() {
    const router = useRouter();

    const { data } = useQuery({
      query: gql`
        {
          authUser {
            id
            name
            email
            createdAt
            updatedAt
          }
        }
      `,
    });

    const user = computed(() => data.value?.authUser);
    const form = ref();

    const { executeMutation: updateUser, fetching, error } = useMutation(gql`
      mutation($input: UpdateUser!) {
        updateUser(input: $input) {
          id
        }
      }
    `);

    const errors = useErrors(error);

    const reset = () => {
      const { name, email } = user.value ?? {};
      form.value = { name, email };
      errors.value = {};
    };

    watchEffect(reset);

    const onSubmit = async () => {
      const { id } = user.value;
      await updateUser({ input: { id, ...form.value! } });

      if (error.value) {
        return;
      }

      notify.success('Your account was successfully updated.');
    };

    const { executeMutation: deleteAuthUser } = useMutation(`
      mutation {
        deleteAuthUser {
          id
        }
      }
    `);

    const onDelete = async () => {
      await deleteAuthUser({});

      if (error.value) {
        notify.danger(error.value.message, { timeout: -1 });
        return;
      }

      loggedIn.value = false;
      router.push('/login');
    };

    return {
      user,
      errors,
      form,
      reset,
      onSubmit,
      fetching,
      onDelete,
    };
  },
});
</script>
