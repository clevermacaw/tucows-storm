<script setup lang="ts">
// Props to control the modal visibility
defineProps({
  isOpen: Boolean,
});

// Emit close event when the modal should be closed
const emit = defineEmits(["close"]);

// Close the modal
const close = () => emit("close");
</script>

<template>
  <div class="modal-backdrop" v-if="isOpen" @click="close">
    <div class="modal-content" @click.stop>
      <slot></slot>
      <button class="close-button" @click="close">&times;</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Modal backdrop (background overlay) */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it stays on top */
}

/* Modal content box */
.modal-content {
  position: relative;
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: slide-down 0.3s ease-out;
}

@media screen and (min-width: $breakpoint-sm) {
  .modal-content {
    max-width: 500px;
  }
}

@media screen and (min-width: $breakpoint-md) {
  .modal-content {
    max-width: 850px;
  }
}

@media screen and (min-width: $breakpoint-lg) {
  .modal-content {
    max-width: 1000px;
  }
}

/* Close button styling */
.close-button {
  position: absolute;
  top: 30px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
}

/* Modal content animation */
@keyframes slide-down {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
