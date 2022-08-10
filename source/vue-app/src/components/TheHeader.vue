<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="#"
      >Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNav"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink
              class="nav-link active"
              aria-current="page"
              to="/"
            >
              Home
            </RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link active"
              to="/books"
            >
              Books
            </RouterLink>
          </li>

          <li
            v-if="store.token !== ''"
            class="nav-item dropdown"
          >
            <a
              id="navBarDropDown"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navBarDropDown"
            >
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/admin/users"
                >
                  Manage Users
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/admin/users/0"
                >
                  Add User
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  to="/admin/books"
                >
                  Manage Books
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  class="dropdown-item"
                  :to="{name:'BookEdit', params: {bookId: 0}}"
                >
                  Add Book
                </RouterLink>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <RouterLink
              v-if="store.token == ''"
              class="nav-link"
              to="/login"
            >
              Login
            </RouterLink>
            <a
              v-else
              href="javascript:void(0);"
              class="nav-link"
              @click="logout"
            >Logout</a>
          </li>
        </ul>

        <span class="navbar-text">
          {{ store.user.first_name ?? '' }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { store } from './store';
import router from '../router/index';

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    logout() {
      const payload = {
        token: store.token,
      };

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
      };

      fetch('http://localhost:8081/users/logout', requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            console.log(response.message);
          } else {
            store.token = '';
            store.user = {};

            document.cookie = '_site_data=; Path=/; '
          + 'SameSite=Strict; Secure; '
          + 'Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            router.push('/login');
          }
        });
    },
  },
};
</script>
