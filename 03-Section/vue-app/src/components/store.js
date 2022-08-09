import { reactive } from 'vue';

const store = reactive({
  token: '',
  user: {},
});

const somethingElse = '';

export { store, somethingElse };
