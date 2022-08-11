<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">
          Books admin
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import Security from './security';

export default {
  beforeMount() {
    Security.requireToken();
  },
};
</script>
