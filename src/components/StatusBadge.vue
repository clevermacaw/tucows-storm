<script setup lang="ts">
import { capitalize } from "@/helpers";

defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span :class="`badge badge-${variant}`">{{ capitalize(text) }}</span>
</template>

<style lang="scss" scoped>
@import "@/variables";

.badge {
  border-radius: 16px;
  text-align: center;
  font-size: 0.75rem;
  padding: 6px 24px;
  display: inline-block;
  width: 100px;
}

.badge-ongoing {
  color: $primary-color;
  background-color: $primary-light-color;
}

.badge-done {
  color: $success-color;
  background-color: $success-light-color;
}

.badge-paused {
  color: $warning-color;
  background-color: $warning-light-color;
}

.badge-failed {
  color: $danger-color;
  background-color: $danger-light-color;
}
</style>
