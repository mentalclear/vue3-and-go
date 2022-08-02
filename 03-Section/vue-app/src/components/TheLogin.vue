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
import FormTag from './forms/FormTag.vue';
import TextInput from './forms/TextInput.vue';

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
    };
  },
  methods: {
    submitHandler() {
      console.log('submitHandler call - success!');

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
        .then((data) => {
          if (data.error) {
            console.log('error:', data.message);
          } else {
            console.log(data);
          }
        });
    },
  },
};
</script>

<style>

</style>
