<template>
  <Container>
    <Card>
      <CardHeader>
        <template #subtitle>
          <Id>{{ user.id }}</Id>
        </template>

        <DangerConfirm
          title="Delete user"
          action-text="Delete"
          @confirm="onDelete"
        >
          Are you sure you want to delete the user <b>{{ user.name }}</b>?

          <template #activator="props">
            <SecondaryButton
              v-bind="props"
              color="danger"
            >
              Delete
            </SecondaryButton>
          </template>
        </DangerConfirm>

        <Button
          :to="{ name: 'EditUser', params: { id: $route.params.id } }"
          class="ml-3"
        >
          Edit
        </Button>
      </CardHeader>

      <CardBody>
        <dl class="grid grid-cols-2 gap-6">
          <div class="col-span-2 lg:col-span-1">
            <Dt>Name</Dt>
            <Dd>{{ user.name }}</Dd>
          </div>

          <div class="col-span-2 lg:col-span-1">
            <Dt>Email address</Dt>
            <Dd>{{ user.email }}</Dd>
          </div>

          <div class="col-span-2 lg:col-span-1">
            <Dt>Created At</Dt>
            <Dd><DateTime>{{ user.createdAt }}</DateTime></Dd>
          </div>

          <div class="col-span-2 lg:col-span-1">
            <Dt>Updated At</Dt>
            <Dd><DateTime>{{ user.updatedAt }}</DateTime></Dd>
          </div>
        </dl>
      </CardBody>
    </Card>
  </Container>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import {
  Container,
  CardHeader,
  CardBody,
  Card,
  Button,
  Dt,
  Dd,
  Id,
  DateTime,
  DangerConfirm,
  SecondaryButton,
} from '@/views/components';
import { notify } from '@/scripts/notifications';
import { useMutation } from '@urql/vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    CardBody,
    Card,
    Button,
    Dt,
    Dd,
    Id,
    DateTime,
    DangerConfirm,
    SecondaryButton,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();

    const { executeMutation: deleteUser } = useMutation(`
      mutation($id: ID!) {
        deleteUser(id: $id) {
          id
        }
      }
    `);

    const onDelete = async () => {
      const { error } = await deleteUser({ id: props.user.id });

      if (error) {
        notify.danger(error.message, { timeout: -1 });
        return;
      }

      notify.success(() => [
        'The user ',
        h('b', props.user.name),
        ' was successfully deleted!',
      ]);

      router.push('/users');
    };

    return {
      onDelete,
    };
  },
});
</script>
