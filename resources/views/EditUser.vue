<template>
  <Container>
    <FormCard @submit="onSubmit">
      <CardHeader>
        <template #subtitle>
          <Id>{{ user.id }}</Id>
        </template>

        <Button
          :to="{ name: 'UserDetails', params: { id: user.id } }"
          color="neutral"
          secondary
        >
          Details
        </Button>
      </CardHeader>

      <UserDetailsCardBody :user="user">
        <template #name>
          <Input
            v-model.trim="form.name"
            :errors="errors.name"
            label="Name"
            required
          />
        </template>

        <template #email>
          <EmailInput
            v-model.trim="form.email"
            :errors="errors.email"
            required
          />
        </template>
      </UserDetailsCardBody>

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
  EmailInput,
  Input,
  Id,
} from '@/views/components';
import UserDetailsCardBody from '@/views/components/UserDetailsCardBody.vue';
import { useRouter } from 'vue-router';
import { User, useUpdateUser } from '@/scripts/composables';
import { notify } from '@/scripts/notifications';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    UserDetailsCardBody,
    FormCard,
    EditCardFooter,
    Button,
    EmailInput,
    Input,
    Id,
  },

  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const form = ref();
    const { updateUser, updating, errors } = useUpdateUser();

    const onReset = () => {
      const { name, email } = props.user;
      form.value = { name, email };
      errors.value = {};
    };

    watchEffect(onReset);

    const onSubmit = async () => {
      const { id } = props.user;
      const { error } = await updateUser({ id, ...form.value! });

      if (error) {
        return;
      }

      notify.success(() => [
        'The user ',
        h('b', props.user.name),
        ' was successfully updated.',
      ]);

      router.push({ name: 'UserDetails', params: { id } });
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
