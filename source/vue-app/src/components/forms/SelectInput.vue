<template>
  <div class="mb-3">
    <label
      :for="name"
      class="form-label"
    >
      <select
        :id="name"
        class="form-select"
        :name="name"
        :required="required"
        :multiple="multiple"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option
          disabled
          value=""
        >
          Choose...
        </option>
        <option
          v-for="option in items"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
      {{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: ['items', 'name', 'required', 'label', 'modelValue', 'multiple'],
  emits: ['update:modelValue'],
};
</script>
