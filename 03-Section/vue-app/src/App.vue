<template>
  <TheHeader />
  <div>
    <RouterView />
  </div>
  <TheFooter />
</template>

<script>
import { store } from '@/components/store';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

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
      store,
    };
  },
  beforeMount() {
    // check for cookie
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
};
</script>

<style>

</style>
