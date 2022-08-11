import router from '@/router/index';
import { store } from '@/components/store';

const Security = {
  // make sure user is authenticated
  requireToken: () => {
    if (store.token === '') {
      router.push('/login');
      return false;
    }
    return true;
  },

  // create request options and send them back
  requestOptions: (payload) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${store.token}`);

    return {
      method: 'POST',
      body: JSON.stringify(payload),
      headers,
    };
  },

};

export default Security;
