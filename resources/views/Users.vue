<template>
  <Container v-if="users">
    <Card>
      <CardHeader>
        <div class="inline-block">
          <SearchParam />
        </div>

        <SlideOver
          title="Filters"
        >
          <TrashedParam />

          <template #activator="props">
            <Button
              v-bind="props"
              class="ml-3"
              white
            >
              Filter
            </Button>
          </template>
        </SlideOver>

        <Button
          to="/users/create"
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
              NAME
            </Th>

            <Th
              class="text-left"
              order
            >
              EMAIL
            </Th>

            <Th
              width="1"
              order
            >
              CREATED AT
            </Th>

            <Th
              v-if="$route.query.trashed"
              width="1"
              order
            >
              DELETED AT
            </Th>

            <Th width="1" />
          </Tr>
        </thead>

        <tbody>
          <Tr
            v-for="user in users.data"
            :key="user.id"
            @dblclick="
              $router.push({ name: 'UserDetails', params: { id: user.id } })
            "
          >
            <Td>
              <Id>{{ user.id }}</Id>
            </Td>

            <Td lead>
              {{ user.name }}
            </Td>

            <Td>{{ user.email }}</Td>

            <Td class="text-center">
              <DateTime>{{ user.createdAt }}</DateTime>
            </Td>

            <Td
              v-if="$route.query.trashed"
              class="text-center"
            >
              <DateTime>{{ user.deletedAt }}</DateTime>
            </Td>

            <Td actions>
              <ShowButton
                :to="{ name: 'UserDetails', params: { id: user.id } }"
                sm
              />

              <WarningConfirm
                v-if="user.deletedAt"
                title="Restore user"
                confirm-text="Restore"
                @confirm="onRestore(user)"
              >
                Are you sure you want to restore the user <b>{{ user.name }}</b>?

                <template #activator="props">
                  <RestoreButton
                    v-bind="props"
                    sm
                  />
                </template>
              </WarningConfirm>

              <DangerConfirm
                v-else
                title="Delete user"
                confirm-text="Delete"
                @confirm="onDelete(user)"
              >
                Are you sure you want to delete the user <b>{{ user.name }}</b>?

                <template #activator="props">
                  <DeleteButton
                    v-bind="props"
                    sm
                  />
                </template>
              </DangerConfirm>

              <EditButton
                :to="{ name: 'EditUser', params: { id: user.id } }"
                sm
              />
            </Td>
          </Tr>
        </tbody>
      </Table>

      <Pagination :paginator-info="users.paginatorInfo" />
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
  SlideOver,
  SearchParam,
  TrashedParam,
  RestoreButton,
  WarningConfirm,
  Loading,
  NotFound,
} from '@/views/components';
import { useUsers, useDeleteUser, useRestoreUser } from '@/scripts/composables';
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
    SlideOver,
    SearchParam,
    TrashedParam,
    RestoreButton,
    WarningConfirm,
    Loading,
    NotFound,
  },

  setup() {
    const { users, fetching } = useUsers();
    const { deleteUser } = useDeleteUser();
    const { restoreUser } = useRestoreUser();

    const onDelete = async (user: { id: string; name: string }) => {
      const { error } = await deleteUser({ id: user.id });

      if (error) {
        notify.danger(error.message);
        return;
      }

      notify.success(() => [
        'The user ',
        h('b', user.name),
        ' was successfully deleted!',
      ]);
    };

    const onRestore = async (user: { id: string; name: string }) => {
      const { error } = await restoreUser({ id: user.id });

      if (error) {
        notify.danger(error.message);
        return;
      }

      notify.success(() => [
        'The user ',
        h('b', user.name),
        ' was successfully restored!',
      ]);
    };

    return {
      users,
      fetching,
      onDelete,
      onRestore,
    };
  },
});
</script>
