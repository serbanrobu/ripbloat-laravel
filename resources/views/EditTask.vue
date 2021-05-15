<template>
  <Container>
    <FormCard @submit="onSubmit">
      <CardHeader>
        <template #subtitle>
          <Id>{{ task.id }}</Id>
        </template>

        <Button
          :to="{ name: 'TaskDetails', params: { id: task.id } }"
          color="neutral"
          secondary
        >
          Details
        </Button>
      </CardHeader>

      <TaskDetailsCardBody :task="task">
        <template #title>
          <Input
            v-model="form.title"
            label="Title"
            :errors="errors.title"
            required
          />
        </template>

        <template #description>
          <Textarea
            v-model="form.description"
            :errors="errors.description"
            label="Description"
            required
          />
        </template>
      </TaskDetailsCardBody>

      <EditCardFooter v-bind="{ onReset, updating }" />
    </FormCard>
  </Container>
</template>

<script lang="ts">
import {
  defineComponent, h, PropType, ref, watchEffect,
} from 'vue';
import {
  Container,
  CardHeader,
  EditCardFooter,
  Button,
  FormCard,
  Input,
  Textarea,
  Id,
} from '@/views/components';
import TaskDetailsCardBody from '@/views/components/TaskDetailsCardBody.vue';
import { useRouter } from 'vue-router';
import { Task, useUpdateTask } from '@/scripts/composables';
import { notify } from '@/scripts/notifications';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    TaskDetailsCardBody,
    FormCard,
    EditCardFooter,
    Button,
    Input,
    Textarea,
    Id,
  },

  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const form = ref();
    const { updateTask, updating, errors } = useUpdateTask();

    const onReset = () => {
      const { title, description } = props.task;
      form.value = { title, description };
      errors.value = {};
    };

    watchEffect(onReset);

    const onSubmit = async () => {
      const { id } = props.task;
      const { error } = await updateTask({ id, ...form.value! });

      if (error) {
        return;
      }

      notify.success(() => [
        'The task ',
        h('b', props.task.title),
        ' was successfully updated.',
      ]);

      router.push({ name: 'TaskDetails', params: { id } });
    };

    return {
      onReset,
      onSubmit,
      errors,
      form,
      updating,
    };
  },
});
</script>
