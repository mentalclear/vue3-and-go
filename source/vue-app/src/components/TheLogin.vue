<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">
          Login
        </h1>
        <hr>
        <form-tag
          name="myform"
          event="myevent"
          @myevent="submitHandler"
        >
          <text-input
            v-model="email"
            label="Email"
            type="email"
            name="email"
            required="true"
          />

          <text-input
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required="true"
          />

          <hr>

          <input
            type="submit"
            class="btn btn-primary"
            value="Login"
          >
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import notie from 'notie';
import FormTag from './forms/FormTag.vue';
import TextInput from './forms/TextInput.vue';
import { store } from './store';

// eslint-disable-next-line import/no-cycle
import router from '../router/index';
// eslint-disable-next-line import/no-cycle
import Security from './security';

export default {
  name: 'TheLogin',
  components: {
    FormTag,
    TextInput,
  },
  data() {
    return {
      email: '',
      password: '',
      store,
    };
  },
  methods: {
    submitHandler() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      fetch(`${process.env.VUE_APP_API_URL}/users/login`, Security.requestOptions(payload))
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            notie.alert({
              type: 'error',
              text: response.message,
              // stay: true,
              // position: 'bottom',
            });
          } else {
            console.log('Token:', response.data.token.token);
            store.token = response.data.token.token;

            store.user = {
              id: response.data.user.id,
              first_name: response.data.user.first_name,
              last_name: response.data.user.last_name,
              email: response.data.user.email,
            };

            // save info to cookie
            const date = new Date();
            const expDays = 1;
            date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;

            // set the cookie
            document.cookie = `_site_data=${
              JSON.stringify(response.data)
            }; ${
              expires
            }; path=/; SameSite=strict; Secure;`;
            router.push('/');
          }
        });
    },
  },
};
</script>
