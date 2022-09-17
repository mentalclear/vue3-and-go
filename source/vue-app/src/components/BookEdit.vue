<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">
          Add/Edit Book
        </h1>
        <hr>

        <form-tag
          name="bookForm"
          event="bookEditEvent"
          @book-edit-event="submitHandler"
        >
          <div
            v-if="book.slug !== ''"
            class="mb-3"
          >
            <img
              :src="`${imgPath}/covers/${book.slug}.jpg`"
              class="img-fluid img-thumbnail book-cover"
              alt="cover"
            >
          </div>

          <div class="mb-3">
            <label
              for="formFile"
              class="form-label"
            >
              <input
                v-if="book.id === 0"
                id="formFile"
                ref="coverInput"
                class="form-control"
                type="file"
                required
                accept="image/jpeg"
                @change="loadCoverImage"
              >
              <input
                v-else
                id="formFile"
                ref="coverInput"
                class="form-control"
                type="file"
                accept="image/jpeg"
                @change="loadCoverImage"
              >Cover Image</label>
          </div>

          <text-input
            v-model="book.title"
            type="text"
            required="true"
            label="Title"
            :value="book.title"
            name="title"
          />

          <select-input
            v-model="book.author_id"
            name="author-id"
            :items="authors"
            required="required"
            label="Author"
          />

          <text-input
            v-model="book.publication_year"
            type="number"
            required="true"
            label="Publication Year"
            :value="book.publication_year"
            name="publication-year"
          />

          <div class="mb-3">
            <label
              for="description"
              class="form-label"
            > Description
              <textarea
                v-model="book.description"
                name="description"
                required
                class="form-control"
                rows="3"
              />
            </label>
          </div>

          <div class="mb-3">
            <label
              for="genres"
              class="form-label"
            > Genres
              <select
                id="genres"
                ref="genres"
                v-model="book.genre_ids"
                class="form-select"
                required
                size="7"
                multiple
              >
                <option
                  v-for="g in genres"
                  :key="g.value"
                  :value="g.value"
                >
                  {{ g.text }}
                </option>
              </select>
            </label>
          </div>

          <hr>

          <div class="float-start">
            <input
              type="submit"
              class="btn btn-primary me-2"
              value="Save"
            >
            <router-link
              to="/admin/books"
              class="btn btn-outline-secondary"
            >
              Cancel
            </router-link>
          </div>
          <div class="float-end">
            <a
              v-if="book.id > 0"
              class="btn btn-danger"
              href="javascript:void(0);"
              @click="confirmDelete(book.id)"
            >
              Delete
            </a>
          </div>
          <div class="clearfix" />
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import FormTag from '@/components/forms/FormTag.vue';
import TextInput from '@/components/forms/TextInput.vue';
import SelectInput from '@/components/forms/SelectInput.vue';

// eslint-disable-next-line import/no-cycle
import router from '@/router';
import notie from 'notie';
// eslint-disable-next-line import/no-cycle
import Security from './security';

export default {
  name: 'BookEdit',
  components: {
    'form-tag': FormTag,
    'text-input': TextInput,
    'select-input': SelectInput,
  },
  emits: ['error', 'success'],
  data() {
    return {
      book: {
        id: 0,
        title: '',
        author_id: 0,
        publication_year: null,
        description: '',
        cover: '',
        slug: '',
        genres: [],
        genre_ids: [],
      },
      authors: [],
      imgPath: process.env.VUE_APP_IMAGE_URL,
      genres: [
        { value: 1, text: 'Science Fiction' },
        { value: 2, text: 'Fantasy' },
        { value: 3, text: 'Romance' },
        { value: 4, text: 'Thriller' },
        { value: 5, text: 'Mystery' },
        { value: 6, text: 'Horror' },
        { value: 7, text: 'Classic' },
      ],
    };
  },
  beforeMount() {
    Security.requireToken();

    // get book for edit if id > 0
    if (this.$route.params.bookId > 0) {
      // editing a book
      fetch(`${process.env.VUE_APP_API_URL}/admin/books/${this.$route.params.bookId}`, Security.requestOptions(''))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message);
          } else {
            this.book = data.data;
            const genreArray = [];
            for (let i = 0; i < this.book.genres.length; i += 1) {
              genreArray.push(this.book.genres[i].id);
            }
            this.book.genre_ids = genreArray;
          }
        });
    }

    // get list of authors for drop down
    fetch(`${process.env.VUE_APP_API_URL}/admin/authors/all`, Security.requestOptions(''))
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.$emit('error', data.message);
        } else {
          this.authors = data.data;
        }
      });
  },
  methods: {
    submitHandler() {
      const payload = {
        id: this.book.id,
        title: this.book.title,
        author_id: parseInt(this.book.author_id, 10),
        publication_year: parseInt(this.book.publication_year, 10),
        description: this.book.description,
        cover: this.book.cover,
        slug: this.book.slug,
        genre_ids: this.book.genre_ids,
      };

      fetch(`${process.env.VUE_APP_API_URL}/admin/books/save`, Security.requestOptions(payload))
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.$emit('error', data.message);
          } else {
            this.$emit('success', 'Changes Saved');
            router.push('/admin/books');
          }
        }).catch((error) => this.$emit('error', error));
    },
    loadCoverImage() {
      // get a reference to the input using ref
      const file = this.$refs.coverInput.files[0];

      // encode the file using the FileReader API
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');
        this.book.cover = base64String;
        // alert(base64String);
      };
      reader.readAsDataURL(file);
    },
    confirmDelete(id) {
      notie.confirm({
        text: 'Are you sure you want to delete this book?',
        submitText: 'Delete',
        submitCallback: () => {
          const payload = {
            id,
          };

          fetch(`${process.env.VUE_APP_API_URL}/admin/books/delete`, Security.requestOptions(payload))
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                this.$emit('error', data.message);
              } else {
                this.$emit('success', 'Book deleted');
                router.push('/admin/books');
              }
            });
        },
      });
    },
  },
};
</script>

<style scoped>
  .book-cover {
      max-width: 10em;
  }
  </style>
