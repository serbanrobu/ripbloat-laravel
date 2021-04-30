<template>
  <Container>
    <form @submit.prevent="onSubmit">
      <Card>
        <CardHeader>
          <template #subtitle>
            <Id>{{ user.id }}</Id>
          </template>

          <SecondaryButton
            :to="{ name: 'UserDetails', params: { id: user.id } }"
            color="neutral"
          >
            Details
          </SecondaryButton>
        </CardHeader>

        <CardBody>
          <dl class="grid grid-cols-2 gap-6">
            <div class="col-span-2 lg:col-span-1">
              <TextField
                v-model="form.name"
                :errors="errors['input.name']"
                label="Name"
                required
              />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <EmailField
                v-model="form.email"
                :errors="errors['input.email']"
                required
              />
            </div>

            <div class="col-span-2 lg:col-span-1">
              <Dt>Created At</Dt>
              <Dd>
                <DateTime>{{ user.createdAt }}</DateTime>
              </Dd>
            </div>

            <div class="col-span-2 lg:col-span-1">
              <Dt>Updated At</Dt>
              <Dd>
                <DateTime>{{ user.updatedAt }}</DateTime>
              </Dd>
            </div>
          </dl>
        </CardBody>

        <CardFooter>
          <WhiteButton
            type="button"
            @click="reset"
          >
            Reset
          </WhiteButton>

          <Button
            :disabled="fetching"
            class="ml-3"
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </form>
  </Container>
</template>

<script lang="ts">
import {
  defineComponent, h, ref, watchEffect,
} from 'vue';
import {
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  WhiteButton,
  SecondaryButton,
  Card,
  EmailField,
  TextField,
  Dt,
  Dd,
  DateTime,
  Id,
} from '@/views/components';
import { useRouter } from 'vue-router';
import { useMutation, gql } from '@urql/vue';
import { useErrors } from '@/scripts/composables';
import { notify } from '@/scripts/notifications';

export default defineComponent({
  components: {
    Container,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    WhiteButton,
    SecondaryButton,
    Card,
    EmailField,
    TextField,
    Dt,
    Dd,
    DateTime,
    Id,
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter();
    const form = ref();

    const { executeMutation: updateUser, fetching, error } = useMutation(gql`
      mutation($input: UpdateUser!) {
        updateUser(input: $input) {
          id
        }
      }
    `);

    const errors = useErrors(error);

    const reset = () => {
      const { name, email } = props.user;
      form.value = { name, email };
      errors.value = {};
    };

    watchEffect(reset);

    const onSubmit = async () => {
      const { id } = props.user;
      await updateUser({ input: { id, ...form.value! } });

      if (error.value) {
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
      reset,
      onSubmit,
      errors,
      form,
      fetching,
    };
  },
});
</script>
