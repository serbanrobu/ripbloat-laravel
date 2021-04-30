<template>
  <Container>
    <form @submit.prevent="onSubmit">
      <Card>
        <CardHeader />

        <CardBody>
          <div class="grid grid-cols-2 gap-6">
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
          </div>
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
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  </Container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  Container,
  Card,
  Button,
  EmailField,
  TextField,
  CardHeader,
  CardBody,
  CardFooter,
  WhiteButton,
} from '@/views/components';
import { useRouter } from 'vue-router';
import { useMutation } from '@urql/vue';
import { notify } from '@/scripts/notifications';
import { useErrors } from '@/scripts/composables';

export default defineComponent({
  components: {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    EmailField,
    TextField,
    Button,
    WhiteButton,
  },

  setup() {
    const router = useRouter();
    const form = ref();

    const { executeMutation, error, fetching } = useMutation(`
      mutation($input: CreateUser!) {
        createUser(input: $input) {
          id
        }
      }
    `);

    const errors = useErrors(error);

    const reset = () => {
      form.value = { name: '', email: '' };
      errors.value = {};
    };

    reset();

    const onSubmit = async () => {
      const { data } = await executeMutation({ input: form.value });

      if (error.value) {
        return;
      }

      const { id } = data.createUser;
      notify.success('The user was successfully created.');
      router.push({ name: 'UserDetails', params: { id } });
    };

    return {
      onSubmit,
      fetching,
      form,
      errors,
      reset,
    };
  },
});
</script>
