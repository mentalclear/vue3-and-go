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
};
</script>

<style>

</style>
