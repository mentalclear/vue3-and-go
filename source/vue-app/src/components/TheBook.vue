<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <img
          v-if="ready"
          class="img-fluid img-thumbnail"
          :src="`${imgPath}/covers/${book.slug}.jpg`"
          alt="cover"
        >
      </div>
      <div
        v-if="ready"
        class="col-md-10"
      >
        <h3 class="mt-3">
          {{ book.title }}
        </h3><hr>
        <p>
          <strong>Author:</strong> {{ book.author.author_name }}<br>
          <strong>Published:</strong> {{ book.publication_year }}
        </p>
        <p>
          {{ book.description }}
        </p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['error'],
  data() {
    return {
      book: { },
      imgPath: process.env.VUE_APP_IMAGE_URL,
      ready: false,
    };
  },
  mounted() {
    fetch(`${process.env.VUE_APP_API_URL}/books/${this.$route.params.bookName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.$emit('error', data.message);
        } else {
          this.book = data.data;
          this.ready = true;
        }
      });
  },
};
</script>
