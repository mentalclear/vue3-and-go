<template>
  <form
    :ref="name"
    :event="event"
    automplete="off"
    :method="method"
    :action="action"
    class="needs-validation"
    novalidate
    @submit.prevent="submit"
  >
    <slot />
  </form>
</template>

<script>
export default {
  name: 'FormTag',
  props: ['method', 'action', 'name', 'event'],
  methods: {
    submit() {
      const myForm = this.$refs[this.$props.name];

      if (myForm.checkValidity()) {
        console.log(`My event name ${this.$props.event}`);
        console.log(`Name ${this.$props.name}`);
        this.$emit(this.$props.event);
      }
      myForm.classList.add('was-validated');
    },
  },
};

</script>

<style scoped>

</style>
