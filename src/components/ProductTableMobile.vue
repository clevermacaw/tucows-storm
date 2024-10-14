<script setup lang="ts">
import { PropType } from "vue";
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
  <table class="product-table__mobile">
    <thead>
      <tr>
        <th>Product name</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        @click="handleSelect(product)"
      >
        <td class="text-left">
          {{ product.name }}<br />
          <span class="serial"
            >{{ product.serial }} - Qty: {{ product.quantity }}</span
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.product-table__mobile {
  width: 100%;
  border: 1px solid #e4e4ef;
  border-radius: 8px;
  font-size: 14px;

  .serial {
    color: #808080;
    font-size: 12px;
  }
}

th,
td {
  padding: 16px;
}

td {
  border-top: 1px solid #e4e4ef;
}

tbody tr:hover {
  cursor: pointer;
  background-color: azure;
}
</style>
