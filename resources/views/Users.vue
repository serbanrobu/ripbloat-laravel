<template>
  <Container>
    <Card v-if="users">
      <CardHeader>
        <Button to="/users/create">
          Create
        </Button>
      </CardHeader>

      <Table
        :items="users.data"
        @dblclick:item="$router.push({ name: 'UserDetails', params: { id: $event.id } })"
      >
        <template #header>
          <Th>ID</Th>

          <Th class="text-left">
            <Sort>NAME</Sort>
          </Th>

          <Th class="text-left">
            <Sort>EMAIL</Sort>
          </Th>

          <Th><Sort>CREATED AT</Sort></Th>
          <Th />
        </template>

        <template #item="{ item }">
          <Td width="1">
            <Id>{{ item.id }}</Id>
          </Td>

          <Td class="font-medium text-neutral-900">
            {{ item.name }}
          </Td>

          <Td>{{ item.email }}</Td>

          <Td class="text-center">
            <DateTime>{{ item.createdAt }}</DateTime>
          </Td>

          <Td class="text-right space-x-1">
            <ShowButton
              :to="{ name: 'UserDetails', params: { id: item.id } }"
            />

            <DangerConfirm
              title="Delete user"
              action-text="Delete"
              @confirm="deleteUser(item)"
            >
              Are you sure you want to delete the user <b>{{ item.name }}</b>?

              <template #activator="props">
                <DeleteButton v-bind="props" />
              </template>
            </DangerConfirm>

            <EditButton :to="{ name: 'EditUser', params: { id: item.id } }" />
          </Td>
        </template>
      </Table>

      <Pagination :paginator-info="users.paginatorInfo" />
    </Card>
  </Container>
</template>

<script lang="ts">
import { computed, defineComponent, h } from 'vue';
import {
  Container,
  Button,
  Th,
  Td,
  Card,
  CardHeader,
  Pagination,
  Table,
  Id,
  Sort,
  DateTime,
  ShowButton,
  DeleteButton,
  EditButton,
  DangerConfirm,
} from '@/views/components';
import { gql, useMutation, useQuery } from '@urql/vue';
import { usePagination } from '@/scripts/composables';
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
    Id,
    Sort,
    DateTime,
    ShowButton,
    DeleteButton,
    EditButton,
    DangerConfirm,
  },

  setup() {
    const {
      first, page, orderBy, PaginatorInfoFrag,
    } = usePagination();

    const { data } = useQuery({
      query: gql`
        query(
          $first: Int
          $page: Int
          $orderBy: [QueryUsersOrderByOrderByClause!]
        ) {
          users(first: $first, page: $page, orderBy: $orderBy) {
            data {
              id
              name
              email
              createdAt
            }
            paginatorInfo {
              ...PaginatorInfoFrag
            }
          }
        }
        ${PaginatorInfoFrag}
      `,
      variables: { first, page, orderBy },
    });

    const users = computed(() => data.value?.users);

    const { executeMutation } = useMutation(`
      mutation($id: ID!) {
        deleteUser(id: $id) {
          id
        }
      }
    `);

    const deleteUser = async (user: { id: string; name: string }) => {
      const { error } = await executeMutation({ id: user.id });

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

    return {
      users,
      deleteUser,
    };
  },
});
</script>
