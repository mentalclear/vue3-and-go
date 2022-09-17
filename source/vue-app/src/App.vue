<template>
  <TheHeader />
  <div>
    <router-view
      v-slot="{ Component }"
      :key="componentKey"
      @success="success"
      @error="error"
      @warning="warning"
      @force-update="forceUpdate"
    >
      <keep-alive include="TheBooks">
        <component
          :is="Component"
        />
      </keep-alive>
    </router-view>
  </div>
  <TheFooter />
</template>

<script>
import notie from 'notie';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import { store } from './components/store';

const getCookie = (name) => document.cookie.split('; ').reduce((r, v) => {
  const parts = v.split('=');
  return parts[0] === name ? decodeURIComponent(parts[1]) : r;
}, '');

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      componentKey: 0,
      store,
    };
  },
  beforeMount() {
    // check for a cookie
    const data = getCookie('_site_data');

    if (data !== '') {
      const cookieData = JSON.parse(data);

      // update store
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      };
    }
  },
  methods: {
    success(msg) {
      notie.alert({
        type: 'success',
        text: msg,
      });
    },
    error(msg) {
      notie.alert({
        type: 'error',
        text: msg,
      });
    },
    warning(msg) {
      notie.alert({
        type: 'warning',
        text: msg,
      });
    },
    forceUpdate() {
      this.componentKey += 1;
    },
  },
};
</script>

<style>

</style>
