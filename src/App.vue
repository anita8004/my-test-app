<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { googleLogout } from '@/plugins/gapi'
import router from '@/router'

const userStore = useUserStore()

const isLogin = computed(() => userStore.token || userStore.credential)

const logout = () => {
  if (userStore.credential) {
    googleLogout()
  } else {
    tokenLogout()
  }
  userStore.clearUserInfo()
  router.replace({ name: 'Login' })
}

const tokenLogout = () => {
  fetch(`https://oauth2.googleapis.com/revoke?token=${userStore.token}`, {
    method: 'POST',
    headers: {
      'Content-type':'application/x-www-form-urlencoded'
    }
  })
}
</script>

<template>
  <div>
    <p class="router-nav">
      <router-link v-if="isLogin" to="/">Home</router-link>
      <router-link v-if="!isLogin" to="/login">Login</router-link>
      <van-button v-else type="default" size="small" plain hairline @click="logout">Logout</van-button>
    </p>
    <van-config-provider theme="dark">
      <router-view></router-view>
    </van-config-provider>
  </div>
</template>

<style lang="scss" scoped>
.router-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
</style>