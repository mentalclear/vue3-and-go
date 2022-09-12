<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">
          Books
        </h1>
      </div>

      <hr>
      <div class="filters text-center">
        <span
          class="filter me-1"
          :class="{ active: currentFilter === 0}"
          @click="setFilter(0)"
          @keydown="Enter"
        >ALL</span>
        <span
          class="filter me-1"
          :class="{ active: currentFilter === 7}"
          @click="setFilter(7)"
          @keydown="Enter"
        >CLASSIC</span>
        <span
          class="filter me-1"
          :class="{ active: currentFilter === 2}"
          @click="setFilter(2)"
          @keydown="Enter"
        >FANTASY</span>
        <span
          class="filter me-1"
          :class="{ active: currentFilter === 6}"
          @click="setFilter(6)"
          @keydown="Enter"
        >HORROR</span>
        <span
          class="filter me-1"
          :class="{ active: currentFilter === 4}"
          @click="setFilter(4)"
          @keydown="Enter"
        >THRILLER</span>
        <span
          class="filter me-1"
          :class="{ active: currentFilter === 1}"
          @click="setFilter(1)"
          @keydown="Enter"
        >SCI FI</span>
      </div>
      <hr>

      <div>
        <div class="card-group">
          <transition-group
            class="p-3 d-flex flex-wrap"
            tag="div"
            appear
            name="books"
          >
            <div
              v-for="b in books"
              :key="b.id"
            >
              <div
                v-if="b.genre_ids.includes(currentFilter) || currentFilter === 0"
                class="card me-2 ms-1 mb-3"
                style="width: 10rem;"
              >
                <RouterLink :to="`/books/${b.slug}`">
                  <img
                    :src="`${imgPath}/covers/${b.slug}.jpg`"
                    class="card-img-top"
                    :alt="`cover for ${b.title}`"
                  >
                </RouterLink>
                <div class="card-body text-center">
                  <h6 class="card-title">
                    {{ b.title }}
                  </h6>
                  <span class="book-author">{{ b.author.author_name }}</span>
                  <br>
                  <small
                    v-for="(g, index) in b.genres"
                    :key="g.id"
                    class="book-muted book-genre"
                  >
                    <em class="me-1"> {{ g.genre_name }}
                      <template v-if="index !== (b.genres.length -1)">,</template>
                    </em>
                  </small>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/components/store';

export default {
  emits: ['error'],
  data() {
    return {
      store,
      ready: false,
      imgPath: process.env.VUE_APP_IMAGE_URL,
      books: {},
      currentFilter: 0,
    };
  },
  beforeMount() {
    fetch(`${process.env.VUE_APP_API_URL}/books`)
      .then((response) => response.json())
      .then((response) => {
        if (this.error) {
          this.$emit('error', response.message);
        } else {
          this.books = response.data.books;
          this.ready = true;
        }
      })
      .catch((error) => this.$emit('error', error));
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter;
    },
  },
};

</script>

<style scoped>
.book-author,
.book-genre {
  font-size: 0.8em;
}
.filter {
  padding: 6px 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.35s;
  border: 1px solid silver;
}

.filters {
  height: 2.5em;
}

.filter.active {
  background: lightgreen;
}

.filter:hover {
  background: lightgray;
}

/* Transition styles */
.books-move {
  transition: all 500ms ease-in-out 50ms;
}

.books-enter-active {
  transition: all 500ms ease-in-out;
}

.books-leave-active {
  transition: all 500ms ease-in;
}

.books-enter .books-leave {
  opacity: 0;
}

</style>
