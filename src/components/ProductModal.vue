<script setup lang="ts">
import { PropType } from "vue";
import AppModal from "./common/AppModal.vue";
import { Product } from "@/types";

defineProps({
  isOpen: Boolean,
  product: Object as PropType<Product | null>,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

function handleClose() {
  emit("close");
}
</script>

<template>
  <AppModal :is-open="isOpen" @close="handleClose">
    <h6 class="title">{{ product?.name }}</h6>
    <div class="content">
      <img :src="product?.image" alt="product picture" />
      <div>
        Key Features
        <ul>
          <li>2.6 GHz Intel Core i7 6-Core (9th Gen)</li>
          <li>16GB of 2666 MHz DDR4 RAM | 8TB SSD</li>
          <li>16" 3072 x 1920 Retina Display</li>
          <li>AMD Radeon Pro 5600M GPU (8GB HBM2)</li>
        </ul>
        The Apple 16" MacBook Pro features a 16" Retina Display, a Magic
        Keyboard with a redesigned scissor mechanism, a six-speaker
        high-fidelity sound system, and an advanced thermal design. This MacBook
        Pro also features an AMD Radeon Pro 5600M graphics card, a 7nm mobile
        discrete GPU designed for pro users. With 8GB of HBM2
      </div>
    </div>
  </AppModal>
</template>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  color: #1a1a1a;
  font-weight: 700;
}

.content {
  display: flex;
  gap: 24px;
  font-size: 12px;
  font-weight: 400;
  line-height: 25px;
  padding-top: 40px;

  & > * {
    width: 50%;
  }
}
</style>
