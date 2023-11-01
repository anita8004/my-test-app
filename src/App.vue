<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { googleLogout } from '@/plugins/gapi'
import router from '@/router'

const userStore = useUserStore()

const isLogin = computed(() => userStore.token || userStore.credential)

const logout = () => {
  if (userStore.login_type === 'google') {
    if (userStore.credential) {
      googleLogout()
    } else {
      tokenLogout()
    }
  }
  if (userStore.login_type === 'facebook') {
    userStore.logoutWithFB()
  }
  userStore.clearUserInfo()
  router.replace({ name: 'Login' })
}

const tokenLogout = () => {
  window.google.accounts.id.revoke(userStore.email, (done) => {
    console.log('consent revoked successful', done.successful)
  })
}
</script>

<template>
  <div>
    <p class="router-nav">
      <van-button v-if="isLogin" type="default" size="small" plain hairline @click="logout">Logout</van-button>
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