<template>
  <Container>
    <Card>
      <CardHeader>
        <template #subtitle>
          <Id>{{ user.id }}</Id>

          <Badge
            v-if="user.deletedAt"
            class="ml-3"
            color="danger"
            rounded
          >
            Deleted
          </Badge>
        </template>

        <WarningConfirm
          v-if="user.deletedAt"
          title="Restore user"
          confirm-text="Restore"
          @confirm="onRestore"
        >
          Are you sure you want to restore the user <b>{{ user.name }}</b>?

          <template #activator="props">
            <Button
              v-bind="props"
              color="warning"
              secondary
            >
              Restore
            </Button>
          </template>
        </WarningConfirm>

        <DangerConfirm
          v-else
          title="Delete user"
          confirm-text="Delete"
          @confirm="onDelete"
        >
          Are you sure you want to delete the user <b>{{ user.name }}</b>?

          <template #activator="props">
            <Button
              v-bind="props"
              color="danger"
              secondary
            >
              Delete
            </Button>
          </template>
        </DangerConfirm>

        <Button
          :to="{ name: 'EditUser', params: { id: $route.params.id } }"
          class="ml-3"
        >
          Edit
        </Button>
      </CardHeader>

      <UserDetailsCardBody :user="user" />
    </Card>

    <Card class="mt-10">
      <CardHeader title="User Created Tasks">
        <Button to="/tasks/create">
          Create
        </Button>
      </CardHeader>

      <List v-if="user.createdTasks.length">
        <ListItem
          v-for="task in user.createdTasks"
          :key="task.id"
        >
          <A :to="{ name: 'TaskDetails', params: { id: task.id } }">
            {{ task.title }}
          </A>
        </ListItem>
      </List>

      <div
        v-else
        class="bg-white px-4 py-3 flex items-center justify-center sm:px-6 text-neutral-500"
      >
        No records found
      </div>
    </Card>

    <Card class="mt-10">
      <CardHeader title="User Assigned Tasks" />

      <List v-if="user.assignedTasks.length">
        <ListItem
          v-for="task in user.assignedTasks"
          :key="task.id"
        >
          <A :to="{ name: 'TaskDetails', params: { id: task.id } }">
            {{ task.title }}
          </A>
        </ListItem>
      </List>

      <div
        v-else
        class="bg-white px-4 py-3 flex items-center justify-center sm:px-6 text-neutral-500"
      >
        No records found
      </div>
    </Card>
  </Container>
</template>

<script lang="ts">
import { defineComponent, h, PropType } from 'vue';
import {
  Container,
  CardHeader,
  Card,
  DangerConfirm,
  Button,
  Id,
  WarningConfirm,
  Badge,
  List,
  ListItem,
  A,
} from '@/views/components';
import UserDetailsCardBody from '@/views/components/UserDetailsCardBody.vue';
import { notify } from '@/scripts/notifications';
import { useDeleteUser, User, useRestoreUser } from '@/scripts/composables';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    UserDetailsCardBody,
    Card,
    DangerConfirm,
    Button,
    Id,
    WarningConfirm,
    Badge,
    List,
    ListItem,
    A,
  },

  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },

  setup(props) {
    const { deleteUser } = useDeleteUser();
    const { restoreUser } = useRestoreUser();

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
    };

    const onRestore = async () => {
      const { error } = await restoreUser({ id: props.user.id });

      if (error) {
        notify.danger(error.message, { timeout: -1 });
        return;
      }

      notify.success(() => [
        'The user ',
        h('b', props.user.name),
        ' was successfully restored!',
      ]);
    };

    return {
      onDelete,
      onRestore,
    };
  },
});
</script>
