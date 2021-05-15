import { gql, useMutation, useQuery } from '@urql/vue';
import {
  useErrors,
  usePagination,
  useOrderBy,
  OrderByClause,
  useTrashed,
  Trashed,
  useSearch,
  Task,
} from '@/scripts/composables';
import { computed, Ref } from 'vue';

export type User = {
  id: string;
  name: string;
  email: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdTasks: Pick<Task, 'id' | 'title'>[];
  assignedTasks: Pick<Task, 'id' | 'title'>[];
};

type UserData = {
  user: User;
}

type UserVariables = {
  id: Ref<string>;
}

export function useUser(id: Ref<string>) {
  const result = useQuery({
    query: gql<UserData, UserVariables>`
      query($id: Hashid!) {
        user(id: $id, trashed: WITH) {
          id
          name
          email
          deletedAt
          createdAt
          updatedAt
          createdTasks {
            id
            title
          }
          assignedTasks {
            id
            title
          }
        }
      }
    `,
    variables: { id },
  });

  const user = computed(() => result.data.value?.user);

  return {
    ...result,
    user,
  };
}

type UsersData = {
  users: {
    data: Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;
  };
};

type UserColumn = 'NAME' | 'EMAIL' | 'CREATED_AT' | 'DELETED_AT';

type UsersVariables = {
  search: Ref<string | undefined>;
  orderBy: Ref<OrderByClause<UserColumn>[] | undefined>;
  first: Ref<number | undefined>;
  page: Ref<number | undefined>;
  trashed: Ref<Trashed | undefined>;
};

export function useUsers() {
  const { first, page, PaginatorInfoFrag } = usePagination();
  const orderBy = useOrderBy<UserColumn>();
  const trashed = useTrashed();
  const search = useSearch();

  const result = useQuery<UsersData, UsersVariables>({
    query: gql`
      query(
        $search: String
        $orderBy: [QueryUsersOrderByOrderByClause!]
        $first: Int
        $page: Int
        $trashed: Trashed
      ) {
        users(
          search: $search
          orderBy: $orderBy
          first: $first
          page: $page
          trashed: $trashed
        ) {
          data {
            id
            name
            email
            deletedAt
            createdAt
          }
          paginatorInfo {
            ...PaginatorInfoFrag
          }
        }
      }
      ${PaginatorInfoFrag}
    `,
    variables: {
      search,
      first,
      page,
      orderBy,
      trashed,
    },
  });

  const users = computed(() => result.data.value?.users);

  return {
    ...result,
    users,
  };
}

type AuthUserData = {
  authUser: User;
};

export function useAuthUser() {
  const result = useQuery<AuthUserData, {}>({
    query: gql`
      {
        authUser {
          id
          name
          email
          deletedAt
          createdAt
          updatedAt
        }
      }
    `,
  });

  const authUser = computed(() => result.data.value?.authUser);

  return {
    ...result,
    authUser,
  };
}

type UpdateUserData = {
  updateUser: {
    id: string;
  };
};

type UpdateUserVariables = {
  id: string;
  name: string;
  email: string;
};

export function useUpdateUser() {
  const result = useMutation(gql<UpdateUserData, UpdateUserVariables>`
    mutation($id: Hashid!, $name: String!, $email: Email!) {
      updateUser(id: $id, name: $name, email: $email) {
        id
      }
    }
  `);

  const errors = useErrors(result.error);

  return {
    ...result,
    updateUser: result.executeMutation,
    updating: result.fetching,
    errors,
  };
}

type DeleteUserData = {
  deleteUser: {
    id: string;
  };
};

type DeleteUserVariables = {
  id: string;
};

export function useDeleteUser() {
  const result = useMutation(gql<DeleteUserData, DeleteUserVariables>`
    mutation($id: Hashid!) {
      deleteUser(id: $id) {
        id
      }
    }
  `);

  return {
    ...result,
    deleteUser: result.executeMutation,
    deleting: result.fetching,
  };
}

type RestoreUserData = {
  restoreUser: {
    id: string;
  };
};

type RestoreUserVariables = {
  id: string;
};

export function useRestoreUser() {
  const result = useMutation(gql<RestoreUserData, RestoreUserVariables>`
    mutation($id: Hashid!) {
      restoreUser(id: $id) {
        id
      }
    }
  `);

  return {
    ...result,
    restoreUser: result.executeMutation,
    restoring: result.fetching,
  };
}

type CreateUserData = {
  createUser: {
    id: string;
  };
};

type CreateUserVariables = {
  name: string;
  email: string;
};

export function useCreateUser() {
  const result = useMutation(gql<CreateUserData, CreateUserVariables>`
    mutation($name: String!, $email: Email!) {
      createUser(name: $name, email: $email) {
        id
      }
    }
  `);

  const errors = useErrors(result.error);

  return {
    ...result,
    createUser: result.executeMutation,
    creating: result.fetching,
    errors,
  };
}
