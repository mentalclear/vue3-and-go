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
            v-model="mail"
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
import { ref, onMounted } from 'vue';
import FormTag from './forms/FormTag.vue';
import TextInput from './forms/TextInput.vue';
import { store } from './store';
import router from '../router/index';
import Security from './security';

export default {
  name: 'LoginComposition',
  components: {
    'form-tag': FormTag,
    'text-input': TextInput,
  },
  props: {},
  emits: ['error'],

  setup(props, ctx) {
    const mail = ref('');
    const password = ref('');

    onMounted(() => {
      console.log('Using new component');
    });

    function submitHandler() {
      const payload = {
        email: mail.value,
        password: password.value,
      };

      fetch(`${process.env.VUE_APP_API_URL}/users/login`, Security.requestOptions(payload))
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            ctx.emit('error', response.message);
          } else {
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
    }

    return {
      submitHandler,
      mail,
      password,
    };
  },
};

</script>
