<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  icon: String,
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div class="input-container">
    <input v-bind="$attrs" :value="modelValue" @input="updateValue" />
    <img v-if="icon" :src="icon" alt="search-icon" class="icon" />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  position: relative;
}

input {
  padding: 12px 8px;
  border: 1px solid #dcdfe3;
  min-width: 260px;
  outline: none;
  border-radius: 4px;
  font-size: 0.875rem;

  &.has-icon {
    padding-left: 40px;
  }

  &:focus {
    border-color: $primary-color;
    border-width: 2px;
  }
}

.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
