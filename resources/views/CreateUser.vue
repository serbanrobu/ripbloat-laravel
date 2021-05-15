<template>
  <Container>
    <FormCard @submit="onSubmit">
      <CardHeader />

      <CardBody>
        <div class="grid grid-cols-2 gap-6">
          <div class="col-span-2 lg:col-span-1">
            <Input
              v-model="form.name"
              :errors="errors.name"
              label="Name"
              required
            />
          </div>

          <div class="col-span-2 lg:col-span-1">
            <EmailInput
              v-model="form.email"
              :errors="errors.email"
              required
            />
          </div>
        </div>
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
  EmailInput,
  Input,
  CardHeader,
  CardBody,
  CreateCardFooter,
} from '@/views/components';
import { useRouter } from 'vue-router';
import { notify } from '@/scripts/notifications';
import { useCreateUser } from '@/scripts/composables';

export default defineComponent({
  components: {
    CardHeader,
    Container,
    FormCard,
    CardBody,
    EmailInput,
    Input,
    CreateCardFooter,
  },

  setup() {
    const router = useRouter();
    const form = ref();
    const { createUser, creating, errors } = useCreateUser();

    const onReset = () => {
      form.value = { name: '', email: '' };
      errors.value = {};
    };

    onReset();

    const onSubmit = async () => {
      const { data, error } = await createUser(form.value);

      if (error) {
        return;
      }

      const { id } = data!.createUser;
      notify.success('The user was successfully created.');
      router.push({ name: 'UserDetails', params: { id } });
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
