/* eslint-disable import/no-cycle */
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

  // check token
  checkToken: () => {
    if (store.token !== '') {
      const payload = {
        token: store.token,
      };

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers,
      };

      fetch(`${process.env.VUE_APP_API_URL}/validate-token`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else if (!data.data) {
            store.token = '';
            store.user = {};
            document.cookie = '_site_data=; Path=/; '
            + 'SameSite=strict; Secure; '
            + 'Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          }
        });
    }
  },

};

export default Security;
