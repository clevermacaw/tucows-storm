<script setup lang="ts">
import { PropType } from "vue";
import StatusBadge from "./StatusBadge.vue";
import { Product } from "@/types";

defineProps({
  products: Object as PropType<Product[]>,
});

const emit = defineEmits<{
  (e: "select", product: Product): void;
}>();

function handleSelect(product: Product) {
  emit("select", product);
}
</script>

<template>
  <table class="product-table">
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th>Status</th>
        <th>Quantity</th>
        <th>Product name</th>
        <th>Prices</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        @click="() => handleSelect(product)"
      >
        <td>{{ product.id }}</td>
        <td class="text-center">
          <StatusBadge :variant="product.status" :text="product.status" />
        </td>
        <td class="text-center">{{ product.quantity }}</td>
        <td class="text-left">{{ product.name }}</td>
        <td class="text-right">{{ product.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.product-table {
  width: 100%;
  border: 1px solid #e4e4ef;
  border-radius: 8px;
}

td {
  border-top: 1px solid #e4e4ef;
}

th,
td {
  padding: 16px;
}

tbody tr:hover {
  cursor: pointer;
  background-color: azure;
}
</style>
