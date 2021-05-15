<template>
  <Container>
    <FormCard @submit="onSubmit">
      <CardHeader />

      <CardBody class="space-y-6">
        <Input
          v-model="form.title"
          :errors="errors.title"
          label="Title"
          required
        />

        <Textarea
          v-model="form.description"
          :errors="errors.description"
          label="Description"
          required
        />
      </CardBody>

      <CreateCardFooter v-bind="{ onReset, creating }" />
    </FormCard>
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  Container,
  FormCard,
  Input,
  Textarea,
  CardHeader,
  CardBody,
  CreateCardFooter,
} from '@/views/components';
import { useRouter } from 'vue-router';
import { notify } from '@/scripts/notifications';
import { useCreateTask } from '@/scripts/composables';

export default defineComponent({
  components: {
    CardHeader,
    Container,
    FormCard,
    CardBody,
    Input,
    Textarea,
    CreateCardFooter,
  },

  setup() {
    const router = useRouter();
    const form = ref();
    const { createTask, creating, errors } = useCreateTask();

    const onReset = () => {
      form.value = { title: '', description: '' };
      errors.value = {};
    };

    onReset();

    const onSubmit = async () => {
      const { data, error } = await createTask(form.value);

      if (error) {
        return;
      }

      const { id } = data!.createTask;
      notify.success('The task was successfully created.');
      router.push({ name: 'TaskDetails', params: { id } });
    };

    return {
      onSubmit,
      creating,
      form,
      errors,
      onReset,
    };
  },
});
</script>
