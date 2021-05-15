import { gql, useMutation, useQuery } from '@urql/vue';
import {
  useErrors,
  usePagination,
  useOrderBy,
  OrderByClause,
  useSearch,
  User,
} from '@/scripts/composables';
import { computed, Ref } from 'vue';

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  creator: Pick<User, 'id' | 'name'>;
  assignes: Pick<User, 'id' | 'name'>[];
};

type TaskData = {
  task: Task;
}

type TaskVariables = {
  id: Ref<string>;
}

export function useTask(id: Ref<string>) {
  const result = useQuery({
    query: gql<TaskData, TaskVariables>`
      query($id: Hashid!) {
        task(id: $id) {
          id
          title
          description
          createdAt
          updatedAt
          creator {
            id
            name
          }
          assignees {
            id
            name
          }
        }
      }
    `,
    variables: { id },
  });

  const task = computed(() => result.data.value?.task);

  return {
    ...result,
    task,
  };
}

type TasksData = {
  tasks: {
    data: Pick<Task, 'id' | 'title' | 'createdAt'>;
  };
};

type TaskColumn = 'TITLE' | 'CREATED_AT';

type TasksVariables = {
  search: Ref<string | undefined>;
  orderBy: Ref<OrderByClause<TaskColumn>[] | undefined>;
  first: Ref<number | undefined>;
  page: Ref<number | undefined>;
};

export function useTasks() {
  const { first, page, PaginatorInfoFrag } = usePagination();
  const orderBy = useOrderBy<TaskColumn>();
  const search = useSearch();

  const result = useQuery<TasksData, TasksVariables>({
    query: gql`
      query(
        $search: String
        $orderBy: [QueryTasksOrderByOrderByClause!]
        $first: Int
        $page: Int
      ) {
        tasks(
          search: $search
          orderBy: $orderBy
          first: $first
          page: $page
        ) {
          data {
            id
            title
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
    },
  });

  const tasks = computed(() => result.data.value?.tasks);

  return {
    ...result,
    tasks,
  };
}

type UpdateTaskData = {
  updateTask: {
    id: string;
  };
};

type UpdateTaskVariables = {
  id: string;
  title: string;
  description: string;
};

export function useUpdateTask() {
  const result = useMutation(gql<UpdateTaskData, UpdateTaskVariables>`
    mutation($id: Hashid!, $title: String!, $description: String!) {
      updateTask(id: $id, title: $title, description: $description) {
        id
      }
    }
  `);

  const errors = useErrors(result.error);

  return {
    ...result,
    updateTask: result.executeMutation,
    updating: result.fetching,
    errors,
  };
}

type DeleteTaskData = {
  deleteTask: {
    id: string;
  };
};

type DeleteTaskVariables = {
  id: string;
};

export function useDeleteTask() {
  const result = useMutation(gql<DeleteTaskData, DeleteTaskVariables>`
    mutation($id: Hashid!) {
      deleteTask(id: $id) {
        id
      }
    }
  `);

  return {
    ...result,
    deleteTask: result.executeMutation,
    deleting: result.fetching,
  };
}

type RestoreTaskData = {
  restoreTask: {
    id: string;
  };
};

type RestoreTaskVariables = {
  id: string;
};

export function useRestoreTask() {
  const result = useMutation(gql<RestoreTaskData, RestoreTaskVariables>`
    mutation($id: Hashid!) {
      restoreTask(id: $id) {
        id
      }
    }
  `);

  return {
    ...result,
    restoreTask: result.executeMutation,
    restoring: result.fetching,
  };
}

type CreateTaskData = {
  createTask: {
    id: string;
  };
};

type CreateTaskVariables = {
  title: string;
  description: string;
};

export function useCreateTask() {
  const result = useMutation(gql<CreateTaskData, CreateTaskVariables>`
    mutation($title: String!, $description: String!) {
      createTask(title: $title, description: $description) {
        id
      }
    }
  `);

  const errors = useErrors(result.error);

  return {
    ...result,
    createTask: result.executeMutation,
    creating: result.fetching,
    errors,
  };
}
