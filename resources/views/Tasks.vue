<template>
  <Container v-if="tasks">
    <Card>
      <CardHeader>
        <div class="inline-block">
          <SearchParam />
        </div>

        <Button
          to="/tasks/create"
          class="ml-3"
        >
          Create
        </Button>
      </CardHeader>

      <Table>
        <thead>
          <Tr>
            <Th width="1">
              ID
            </Th>

            <Th
              class="text-left"
              order
            >
              TITLE
            </Th>

            <Th
              width="1"
              order
            >
              CREATED AT
            </Th>

            <Th width="1" />
          </Tr>
        </thead>

        <tbody>
          <Tr
            v-for="task in tasks.data"
            :key="task.id"
            @dblclick="
              $router.push({ name: 'TaskDetails', params: { id: task.id } })
            "
          >
            <Td>
              <Id>{{ task.id }}</Id>
            </Td>

            <Td lead>
              {{ task.title }}
            </Td>

            <Td class="text-center">
              <DateTime>{{ task.createdAt }}</DateTime>
            </Td>

            <Td actions>
              <ShowButton
                :to="{ name: 'TaskDetails', params: { id: task.id } }"
                sm
              />

              <DangerConfirm
                title="Delete task"
                confirm-text="Delete"
                @confirm="onDelete(task)"
              >
                Are you sure you want to delete the task <b>{{ task.title }}</b>?

                <template #activator="props">
                  <DeleteButton
                    v-bind="props"
                    sm
                  />
                </template>
              </DangerConfirm>

              <EditButton
                :to="{ name: 'EditTask', params: { id: task.id } }"
                sm
              />
            </Td>
          </Tr>
        </tbody>
      </Table>

      <Pagination :paginator-info="tasks.paginatorInfo" />
    </Card>
  </Container>

  <Loading v-else-if="fetching" />
  <NotFound v-else />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import {
  Container,
  Button,
  Th,
  Td,
  Tr,
  Card,
  CardHeader,
  Pagination,
  Table,
  Id,
  DateTime,
  ShowButton,
  DeleteButton,
  EditButton,
  DangerConfirm,
  SearchParam,
  Loading,
  NotFound,
} from '@/views/components';
import { useTasks, useDeleteTask } from '@/scripts/composables';
import { notify } from '@/scripts/notifications';

export default defineComponent({
  components: {
    Container,
    Button,
    Card,
    CardHeader,
    Pagination,
    Table,
    Th,
    Td,
    Tr,
    Id,
    DateTime,
    ShowButton,
    DeleteButton,
    EditButton,
    DangerConfirm,
    SearchParam,
    Loading,
    NotFound,
  },

  setup() {
    const { tasks, fetching } = useTasks();
    const { deleteTask } = useDeleteTask();

    const onDelete = async (task: { id: string; title: string }) => {
      const { error } = await deleteTask({ id: task.id });

      if (error) {
        notify.danger(error.message);
        return;
      }

      notify.success(() => [
        'The task ',
        h('b', task.title),
        ' was successfully deleted!',
      ]);
    };

    return {
      tasks,
      fetching,
      onDelete,
    };
  },
});
</script>
