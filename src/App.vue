<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import AppButton from "./components/common/AppButton.vue";
import AppInput from "./components/common/AppInput.vue";
import ProductModal from "./components/ProductModal.vue";
import ProductTable from "./components/ProductTable.vue";
import logo from "@/assets/logo.png";
import menuIcon from "@/assets/menu.svg";

import searchIcon from "@/assets/search.svg";

import { Product, SortableColumns, SortOrder } from "./types";
import { getProducts } from "./api";
import ProductTableMobile from "./components/ProductTableMobile.vue";
import UserToolbar from "./components/UserToolbar.vue";

const query = ref("");
const products = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);
const isProductModalOpen = ref(false);
const sortOrder = ref<SortOrder>("desc");
const sortBy = ref<SortableColumns>("total");
const isMenuHidden = ref(true);

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

function handleToggleMenu() {
  isMenuHidden.value = !isMenuHidden.value;
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
        <div class="menu-icon" @click="handleToggleMenu">
          <img :src="menuIcon" alt="hamburger" />
        </div>
      </div>

      <div class="nav-right">
        <div :class="['toolbar-mobile', { hidden: isMenuHidden }]">
          <UserToolbar />
        </div>
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
          <UserToolbar />
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
      <div class="product-table__container">
        <ProductTable
          :products="productsChunk"
          :sort-order="sortOrder"
          :sort-by="sortBy"
          @select="handleSelectProduct"
          @sort="handleSortProducts"
        />
      </div>
      <div class="product-table__mobile__container">
        <ProductTableMobile
          :products="productsChunk"
          @select="handleSelectProduct"
        />
      </div>
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

  .toolbar {
    display: flex;
    gap: 4px;
  }

  .toolbar-mobile {
    display: none;
  }

  .menu-icon {
    display: none;
  }

  @media screen and (max-width: $breakpoint-md) {
    .toolbar {
      display: none;
    }

    .toolbar-mobile {
      display: flex;
      gap: 4px;
      justify-content: flex-end;

      &.hidden {
        display: none;
      }
    }

    .menu-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 4px;

      &:hover {
        background-color: #e4e4ef;
      }
    }

    nav {
      flex-direction: column;

      .nav-left {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }

      .nav-right {
        display: block;
        margin-top: 12px;
      }
    }

    .search.hidden {
      display: none;
    }
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

  @media screen and (max-width: $breakpoint-md) {
    padding-top: 24px;
  }
}

.product-table__container {
  display: block;
}

.product-table__mobile__container {
  display: none;
}

@media screen and (max-width: $breakpoint-md) {
  .product-table__container {
    display: none;
  }

  .product-table__mobile__container {
    display: block;
  }
}
</style>
