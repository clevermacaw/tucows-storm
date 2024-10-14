<script setup lang="ts">
import notificationsIcon from "@/assets/notifications.svg";
import settingsIcon from "@/assets/settings.svg";
import userIcon from "@/assets/user.svg";
</script>

<template>
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
</template>

<style lang="scss" scoped>
.icon {
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user {
  display: flex;
  align-items: center;
  color: $primary-color;
}
</style>
