<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">
          All Users
        </h1>
      </div>
      <hr>

      <table
        v-if="ready"
        class="table table-compact table-striped"
      >
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>
              <RouterLink
                :to="`/admin/users/${user.id}`"
              >
                {{ user.last_name }}, {{ user.first_name }}
              </RouterLink>
            </td>
            <td>
              {{ user.email }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        Loading...
      </p>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import Security from './security';

export default {
  emits: ['error'],
  data() {
    return {
      users: [],
      ready: false,
    };
  },

  beforeMount() {
    Security.requireToken();

    fetch(`${process.env.VUE_APP_API_URL}/admin/users`, Security.requestOptions(''))
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          this.$emit('error', response.message);
        } else {
          this.users = response.data.users;
          this.ready = true;
        }
      })
      .catch((error) => {
        this.$emit('error', error);
      });
  },
};
</script>
