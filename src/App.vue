<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import AppButton from "./components/common/AppButton.vue";
import AppInput from "./components/common/AppInput.vue";
import ProductModal from "./components/ProductModal.vue";
import ProductTable from "./components/ProductTable.vue";
import logo from "@/assets/logo.png";
import notificationsIcon from "@/assets/notifications.svg";
import searchIcon from "@/assets/search.svg";
import settingsIcon from "@/assets/settings.svg";
import userIcon from "@/assets/user.svg";
import { Product, SortableColumns, SortOrder } from "./types";
import { getProducts } from "./api";

const query = ref("");
const products = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);
const isProductModalOpen = ref(false);
const sortOrder = ref<SortOrder>("desc");
const sortBy = ref<SortableColumns>("total");

const productsChunk = computed(() => {
  return products.value.slice(0, 10);
});

function handleSearch(e: Event) {
  (e as SubmitEvent).preventDefault();
  fetchProducts();
}

function fetchProducts() {
  getProducts({
    query: query.value,
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  }).then((res) => {
    products.value = res.products;
  });
}

function handleSelectProduct(product: Product) {
  selectedProduct.value = product;
  isProductModalOpen.value = true;
}

function handleCloseProductModal() {
  isProductModalOpen.value = false;
}

function handleSortProducts(
  newSortBy: SortableColumns,
  newSortOrder: SortOrder
) {
  sortBy.value = newSortBy;
  sortOrder.value = newSortOrder;
  fetchProducts();
}

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <header>
    <nav>
      <div class="nav-left">
        <img :src="logo" alt="logo" />
      </div>
      <div class="nav-right">
        <form class="search" @submit="handleSearch">
          <AppInput
            v-model="query"
            class="has-icon"
            placeholder="Search"
            :icon="searchIcon"
          />
          <AppButton type="submit">Search</AppButton>
        </form>
        <div class="toolbar">
          <div class="icon">
            <img :src="settingsIcon" alt="settings icon" />
          </div>
          <div class="icon">
            <img :src="notificationsIcon" alt="notifications icon" />
          </div>
          <div class="user">
            <div class="icon">
              <img :src="userIcon" alt="user icon" />
            </div>
            <span>Adriana Arias</span>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="products">
      <div class="title">
        Products
        <span>{{ productsChunk.length }} of {{ products.length }} results</span>
      </div>
      <ProductTable
        :products="productsChunk"
        :sort-order="sortOrder"
        :sort-by="sortBy"
        @select="handleSelectProduct"
        @sort="handleSortProducts"
      />
    </div>
    <ProductModal
      :product="selectedProduct"
      :is-open="isProductModalOpen"
      @close="handleCloseProductModal"
    />
  </main>
</template>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

header {
  nav {
    display: flex;
    align-items: center;
    width: 100%;

    .nav-right {
      margin-left: auto;
      display: flex;
      gap: 32px;
    }
  }

  .search {
    display: flex;
    align-items: stretch;
    gap: 16px;
  }

  .icon {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toolbar {
    display: flex;
    gap: 4px;
  }

  .user {
    display: flex;
    align-items: center;
    color: $primary-color;
  }
}

.products {
  padding-top: 64px;

  .title {
    margin-bottom: 8px;
    font-weight: 700;

    span {
      font-size: 12px;
      font-weight: 400;
      color: #808080;
    }
  }
}
</style>
