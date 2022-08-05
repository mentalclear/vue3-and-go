<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">
          Login
        </h1>
        <hr>
        <FormTag
          name="myform"
          event="myevent"
          @myevent="submitHandler"
        >
          <TextInput
            v-model="email"
            label="Email"
            type="email"
            name="email"
            required="true"
          />
          <TextInput
            v-model="password"
            label="Password"
            type="password"
            name="password"
            required="true"
          />

          <hr>
          <label for="sbmt">
            <input
              id="sbmt"
              type="submit"
              class="btn btn-primary"
              value="Login"
            >
          </label>
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/components/store';
// eslint-disable-next-line import/no-cycle
import router from '@/router/index';
import notie from 'notie';
import FormTag from '@/components/forms/FormTag.vue';
import TextInput from '@/components/forms/TextInput.vue';

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
      console.log('submitHandler called - success!');

      const payload = {
        email: this.email,
        password: this.password,
      };

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      fetch('http://localhost:8081/users/login', requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log('Error:', response.message);
            notie.alert({
              type: 'error',
              text: response.message,
              // stay: true,
              // position: 'bottom',
            });
          } else {
            console.log('Token:', response.data.token.token);
            store.token = response.data.token.token;
            router.push('/');
          }
        });
    },
  },
};
</script>

<style>

</style>
