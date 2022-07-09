<template>
  <div class="form-check">
    <label
      class="form-check-label"
      :for="name"
    >
      <input
        :id="name"
        class="form-check-input"
        :checked="checked"
        :required="required"
        type="checkbox"
        :value="value"
        :name="name"
      >

      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckInput',
  props: ['label', 'required', 'name', 'value', 'checked'],
};
</script>
