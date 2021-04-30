import { createApp } from 'vue';
import App from '@/views/App.vue';
import 'tailwindcss/tailwind.css';
import router from '@/scripts/router';
// import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import urql, {
  cacheExchange,
  dedupExchange,
  errorExchange,
  fetchExchange,
} from '@urql/vue';
import { getCookie } from '@/scripts/utils';
import axios from 'axios';
import loggedIn from '@/scripts/auth';

Object.assign(window, { Pusher });

const app = document.getElementById('app')!;
const loggedInJson = app.dataset.loggedIn;
delete app.dataset.loggedIn;
loggedIn.value = loggedInJson ? !!JSON.parse(loggedInJson) : false;

// const echo = new Echo({
//   broadcaster: 'pusher',
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   wsHost: window.location.hostname,
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true,
// });

// watchEffect(() => {
//   if (id) {
//     echo.private(`App.Models.User.${id}`).listen('Test', (e: any) => {
//       console.log(e);
//     });
//   }
// });

createApp(App)
  .use(router)
  .use(urql, {
    url: '/graphql',
    requestPolicy: 'cache-and-network',
    fetchOptions: () => ({
      headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
      },
    }),
    exchanges: [
      dedupExchange,
      cacheExchange,
      errorExchange({
        async onError(error) {
          const status = error.response?.status;

          if (
            (status && (status === 401 || status === 419))
            || error.graphQLErrors[0]?.extensions?.category === 'authentication'
          ) {
            await axios.get('/sanctum/csrf-cookie');
            loggedIn.value = false;

            router.push({
              name: 'Login',
              query: { redirect: router.currentRoute.value.fullPath },
            });
          }
        },
      }),
      fetchExchange,
    ],
  })
  .mount(app);

export default loggedIn;
