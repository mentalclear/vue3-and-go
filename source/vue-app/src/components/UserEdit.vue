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
            :value="user.password"
            name="password"
          />
          <TextInput
            v-else
            v-model="user.password"
            type="password"
            label="Password"
            help="Leave empty to keep existing password"
            :value="user.password"
            name="password"
          />

          <div class="form-check">
            <label
              class="form-check-label"
              for="user-active"
            >
              <input
                id="user-active"
                v-model="user.active"
                class="form-check-input"
                type="radio"
                :value="1"
              >
              Active</label>
          </div>

          <div class="form-check">
            <label
              class="form-check-label"
              for="user-active-2"
            >
              <input
                id="user-active-2"
                v-model="user.active"
                class="form-check-input"
                type="radio"
                :value="0"
              >
              Inactive</label>
          </div>

          <hr>

          <div class="float-start">
            <input
              type="submit"
              class="btn btn-primary me-2"
              value="Save"
            >
            <RouterLink
              to="/admin/users"
              class="btn btn-outline-secondary"
            >
              Cancel
            </RouterLink>
          </div>
          <div class="float-end">
            <a
              v-if="($route.params.userId > 0)
                && (parseInt(String($route.params.userId), 10) !== store.user.id)"
              class="btn btn-danger"
              href="javascript:void(0);"
              @click="confirmDelete(user.id)"
            > Delete </a>
          </div>
          <div class="clearfix" />
        </FormTag>
      </div>
    </div>
  </div>
</template>

<script>
import notie from 'notie';
// eslint-disable-next-line import/no-cycle
import router from '@/router/index';
import { store } from './store';
// eslint-disable-next-line import/no-cycle
import Security from './security';
import FormTag from './forms/FormTag.vue';
import TextInput from './forms/TextInput.vue';

export default {
  components: {
    FormTag,
    TextInput,
  },
  emits: ['error', 'success'],
  data() {
    return {
      user: {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        active: 0,
      },
      store,
    };
  },
  beforeMount() {
    Security.requireToken();

    if (parseInt(String(this.$route.params.userId), 10) > 0) {
      // editing existing user
      fetch(`${process.env.VUE_APP_API_URL}/admin/users/get/${this.$route.params.userId}`, Security.requestOptions(''))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message);
          } else {
            this.user = data;
            // make password empty for existing users:
            this.user.password = '';
          }
        });
    }
  },
  methods: {
    submitHandler() {
      const payload = {
        id: parseInt(String(this.$route.userId), 10),
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        active: this.user.active,
      };

      fetch(`${process.env.VUE_APP_API_URL}/admin/users/save`, Security.requestOptions(payload))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message);
          } else {
            this.$emit('success', 'Changes saved!');
            router.push('/admin/users');
          }
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    },
    confirmDelete(id) {
      notie.confirm({
        text: 'Are you sure you want to delete this user?',
        submitText: 'Delete',
        submitCallback: () => {
          console.log('will delete', id);

          const payload = {
            id,
          };

          fetch(`${process.env.VUE_APP_API_URL}/admin/users/delete`, Security.requestOptions(payload))
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                this.$emit('error', data.message);
              } else {
                this.$emit('success', 'User deleted');
                router.push('/admin/users');
              }
            });
        },
      });
    },
  },
};
</script>
