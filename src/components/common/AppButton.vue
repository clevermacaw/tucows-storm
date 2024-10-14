<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  variant: {
    type: String as PropType<"primary" | "secondary">,
    default: "primary",
  },
});
</script>

<template>
  <button :class="[`button-${variant}`, $attrs.class]"><slot></slot></button>
</template>

<style lang="scss" scoped>
button {
  padding: 12px 24px;

  outline: none;
  border: none;
  font-size: 0.875rem;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
  }
}

.button-primary {
  color: white;
  background-color: $primary-color;

  &:hover {
    background-color: $primary-dark-color;
  }
}

.button-secondary {
  color: black;
  background-color: $secondary-color;

  &:hover {
    background-color: $secondary-dark-color;
  }
}
</style>
