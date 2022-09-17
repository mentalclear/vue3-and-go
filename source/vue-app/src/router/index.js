import { createRouter, createWebHistory } from 'vue-router';
// eslint-disable-next-line import/no-cycle
import Security from '@/components/security';
import TheBody from '../components/TheBody.vue';
// import TheLogin from '../components/TheLogin.vue';
import LoginComposition from '../components/TheLogin.vue';
// import TheBooks from '../components/TheBooks.vue';
import BooksComposition from '../components/BooksComposition.vue';
import BookComposition from '../components/BookComposition.vue';
// import TheBook from '../components/TheBook.vue';
import BooksAdmin from '../components/BooksAdmin.vue';
import BookEdit from '../components/BookEdit.vue';
import TheUsers from '../components/TheUsers.vue';
import User from '../components/UserEdit.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TheBody,
  },
  {
    path: '/login',
    // name: 'Login',
    // component: TheLogin,
    name: 'LoginComposition',
    component: LoginComposition,
  },
  {
    path: '/books',
    // name: 'Books',
    name: 'BooksComposition',
    // component: TheBooks,
    component: BooksComposition,
  },
  {
    path: '/books/:bookName',
    // name: 'Book',
    // component: TheBook,
    name: 'BookComposition',
    component: BookComposition,
  },
  {
    path: '/admin/books',
    name: 'BooksAdmin',
    component: BooksAdmin,
  },
  {
    path: '/admin/books/:bookId',
    name: 'BookEdit',
    component: BookEdit,
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: TheUsers,
  },
  {
    path: '/admin/users/:userId',
    name: 'User',
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  Security.checkToken();
});

export default router;
