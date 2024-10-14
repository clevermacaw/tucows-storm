<script setup lang="ts"></script>

<template>
  <button><slot></slot></button>
</template>

<style lang="scss" scoped>
button {
  padding: 12px 24px;
  color: white;
  background-color: $primary-color;
  outline: none;
  border: none;
  font-size: 0.875rem;
  border-radius: 4px;

  &:hover {
    background-color: $primary-dark-color;
  }
}
</style>
