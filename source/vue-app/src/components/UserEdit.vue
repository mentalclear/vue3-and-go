<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">
          User
        </h1>
        <FormTag
          name="userform"
          event="userEditEvent"
          @user-edit-event="submitHandler"
        >
          <TextInput
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            :value="user.first_name"
            name="first-name"
          />
          <TextInput
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            :value="user.last_name"
            name="last-name"
          />
          <TextInput
            v-model="user.email"
            type="email"
            required="true"
            label="Email"
            :value="user.email"
            name="email"
          />
          <TextInput
            v-if="user.id === 0"
            v-model="user.password"
            type="password"
            required="true"
            label="Password"
            :value="user.email"
            name="password"
          />
          <TextInput
            v-else
            v-model="user.password"
            type="password"
            label="Password"
            :value="user.email"
            name="password"
          />
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
// import notie from 'notie';
// eslint-disable-next-line import/no-cycle
import Security from './security';
import FormTag from './forms/FormTag.vue';
import TextInput from './forms/TextInput.vue';

export default {
  components: {
    FormTag,
    TextInput,
  },
  data() {
    return {
      user: {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
    };
  },
  beforeMount() {
    Security.requireToken();

    if (parseInt(String(this.$route.params.userId), 10) > 0) {
      // editing existing user
      // TODO - get user from the DB
    }
  },
  methods: {
    submitHandler() {

    },
  },
};
</script>
