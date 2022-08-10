<template>
  <div class="mb-3">
    <label
      :for="name"
      class="form-label"
    >{{ label }}
      <select
        :id="name"
        class="form-select"
        :name="name"
        :required="required"
      >
        <option
          v-for="option in items"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: ['items', 'name', 'required', 'label'],
};
</script>
