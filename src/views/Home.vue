<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import router from '@/router'
const userStore = useUserStore()

if (!userStore.isLogin) {
  router.replace({ name: 'Login' })
}
</script>

<template>
<h1>Home</h1>
<div v-if="userStore.isLogin" class="user-info">
  <van-image
    v-if="userStore.picture"
    class="user-image"
    :src="userStore.picture"
    width="5rem"
    height="5rem"
    round
    fit="cover"
  >
    <template #error>{{ userStore.name }}</template>
  </van-image>
  <van-cell-group inset>
    <van-cell v-if="userStore.credential" title="Credential" :value="userStore.credential" />
    <van-cell v-if="userStore.token" title="Token" :value="userStore.token" />
    <van-cell v-if="userStore.name" title="Name" :value="userStore.name" />
    <van-cell v-if="userStore.email" title="Email" :value="userStore.email" />
    <van-cell v-if="userStore.exp" title="Exp" :value="userStore.exp" />
  </van-cell-group>
</div>
</template>

<style scoped>
.user-info {
  max-width: 1000px;
  margin: 0 auto;
}

.user-image {
  margin-bottom: .8rem;
}
</style>
