<script setup lang="ts">
import { computed, PropType } from "vue";
import StatusBadge from "./StatusBadge.vue";
import { formatPrice } from "@/helpers";
import { Product, SortableColumns, SortOrder } from "@/types";
import upIcon from "@/assets/chevron-up.svg";
import downIcon from "@/assets/chevron-down.svg";

const props = defineProps({
  products: Object as PropType<Product[]>,
  sortBy: {
    type: Object as PropType<SortableColumns>,
    default: "price",
  },
  sortOrder: {
    type: Object as PropType<SortOrder>,
    default: "desc",
  },
});

const emit = defineEmits<{
  (e: "select", product: Product): void;
  (e: "sort", sortBy: SortableColumns, sortOrder: SortOrder): void;
}>();

const sortOrderSymbol = computed(() => {
  return props.sortOrder === "asc" ? upIcon : downIcon;
});

function handleSelect(product: Product) {
  emit("select", product);
}

function sortTable(column: SortableColumns) {
  let order: SortOrder = "desc";
  if (props.sortBy === column)
    order = props.sortOrder === "asc" ? "desc" : "asc";
  emit("sort", column, order);
}
</script>

<template>
  <div class="table-responsive">
    <table class="product-table">
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th>Status</th>
          <th @click="sortTable('quantity')">
            Quantity
            <span v-if="sortBy === 'quantity'" class="sort-icon">
              <img :src="sortOrderSymbol" alt="sort order" />
            </span>
          </th>
          <th @click="sortTable('name')">
            Product name
            <span v-if="sortBy === 'name'" class="sort-icon">
              <img :src="sortOrderSymbol" alt="sort order" />
            </span>
          </th>
          <th @click="sortTable('total')">
            Prices
            <span v-if="sortBy === 'total'" class="sort-icon">
              <img :src="sortOrderSymbol" alt="sort order" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          @click="handleSelect(product)"
        >
          <td>{{ product.id }}</td>
          <td class="text-center">
            <StatusBadge :variant="product.status" :text="product.status" />
          </td>
          <td class="text-center">{{ product.quantity }}</td>
          <td class="text-left">
            {{ product.name }}<br /><span class="serial">{{
              product.serial
            }}</span>
          </td>
          <td class="text-right">{{ formatPrice(product.total) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.table-responsive {
  overflow-x: auto;
}

.product-table {
  width: 100%;
  min-width: 800px;
  border: 1px solid #e4e4ef;
  border-radius: 8px;

  .serial {
    color: #808080;
    font-size: 12px;
  }

  .sort-icon {
    position: absolute;
    top: 20px;
    right: 16px;

    img {
      width: 16px;
    }
  }
}

th {
  position: relative;
}

td {
  border-top: 1px solid #e4e4ef;
}

th,
td {
  padding: 16px;

  &:last-child {
    border-left: 2px solid #e4e4ef;
  }
}

tbody tr:hover {
  cursor: pointer;
  background-color: azure;
}
</style>
