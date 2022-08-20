<template>
  <div class="mb-3">
    <label
      :for="name"
      class="form-label"
    >{{ label }}
      <input
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :min="min"
        :max="max"
        :value="modelValue"
        :autocomplete="name + '-new'"
        class="form-control"
        @input="$emit('update:modelValue', $event.target.value)"
      ></label>
    <div class="form-text">
      {{ help }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: String,
      default: '',
    },
    min: {
      type: String,
      default: '',
    },
    max: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    help: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>
