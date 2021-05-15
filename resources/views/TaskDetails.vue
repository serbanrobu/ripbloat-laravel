<template>
  <Container>
    <Card>
      <CardHeader>
        <template #subtitle>
          <Id>{{ task.id }}</Id>
        </template>

        <DangerConfirm
          title="Delete task"
          confirm-text="Delete"
          @confirm="onDelete"
        >
          Are you sure you want to delete the task <b>{{ task.title }}</b>?

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
          :to="{ name: 'EditTask', params: { id: $route.params.id } }"
          class="ml-3"
        >
          Edit
        </Button>
      </CardHeader>

      <TaskDetailsCardBody :task="task" />
    </Card>

    <Card class="mt-10">
      <CardHeader title="Task Assignees" />

      <List v-if="task.assignees.length">
        <ListItem
          v-for="assignee in task.assignees"
          :key="assignee.id"
        >
          <A :to="{ name: 'UserDetails', id: assignee.id }">
            {{ assignee.name }}
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
  List,
  ListItem,
  A,
} from '@/views/components';
import TaskDetailsCardBody from '@/views/components/TaskDetailsCardBody.vue';
import { notify } from '@/scripts/notifications';
import { Task, useDeleteTask } from '@/scripts/composables';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    TaskDetailsCardBody,
    Card,
    DangerConfirm,
    Button,
    Id,
    List,
    ListItem,
    A,
  },

  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },

  setup(props) {
    const { deleteTask } = useDeleteTask();
    const router = useRouter();

    const onDelete = async () => {
      const { error } = await deleteTask({ id: props.task.id });

      if (error) {
        notify.danger(error.message, { timeout: -1 });
        return;
      }

      notify.success(() => [
        'The task ',
        h('b', props.task.title),
        ' was successfully deleted!',
      ]);

      router.push('/tasks');
    };

    return {
      onDelete,
    };
  },
});
</script>
