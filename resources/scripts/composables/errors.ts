import {
  toRaw, Ref, ref, watchEffect,
} from 'vue';
import { CombinedError } from '@urql/vue';

export function useErrors(error: Ref<CombinedError | undefined>) {
  const errors = ref({});

  watchEffect(() => {
    errors.value = toRaw(error.value?.graphQLErrors?.[0])?.extensions?.validation ?? {};
  });

  return errors;
}

export default useErrors;
