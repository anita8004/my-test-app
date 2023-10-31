<script setup lang="ts">
import { googleTokenLogin, googleAuthCodeLogin, decodeCredential, googleSdkLoaded } from '@/plugins/gapi'
import type { CallbackTypes } from '@/plugins/gapi'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const userStore = useUserStore()

const login = () => {
  googleTokenLogin().then((response) => {
    console.log('googleTokenLogin response: ', response)
    userStore.token = response.access_token
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${response.token_type} ${response.access_token}`
      }
    })
    .then(res => res.json())
    .then(result => {
      console.log('result: ', result)
      userStore.name = result.name
      userStore.email = result.email
      userStore.email_verified = result.email_verified
      userStore.picture = result.picture
      userStore.exp = result.exp
    })
    .catch(error => {
      console.log('error: ', error)
    })
    router.replace({ name: 'Home' })
  })
}

// const login2 = () => {
//   googleAuthCodeLogin().then((response) => {
//     console.log("Handle the response", response)
//   })
// }

// const login3 = () => {
//   googleSdkLoaded((google) => {
//     google.accounts.oauth2.initCodeClient({
//       client_id: '952327172004-nlgseih6hkf8sm96ju4njh2j22ibuj5f.apps.googleusercontent.com',
//       scope: 'email profile openid',
//       callback: (response) => {
//         console.log("Handle the response", response)
//       }
//     }).requestCode()
//   })
// }

const callback: CallbackTypes.CredentialCallback = (response) => {
  console.log('CredentialCallback: ', response)
  const responsePayload: any = decodeCredential(response.credential)
  console.log('responsePayload: ', responsePayload)
  userStore.credential = response.credential
  userStore.name = responsePayload.name
  userStore.email = responsePayload.email
  userStore.email_verified = responsePayload.email_verified
  userStore.picture = responsePayload.picture
  userStore.exp = responsePayload.exp
  router.replace({ name: 'Home' })
}

// const callback2: CallbackTypes.TokenResponseCallback = (response) => {
//   console.log('TokenResponseCallback: ', response)
// }

</script>

<template>
<div class="page-login">
  <header>
    <h1>Login</h1>
    <!-- <p>IsInit: {{ Vue3GoogleOauth.isInit }}</p>
    <p>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</p> -->
  </header>
  <div class="login-list">
    <p>google建議的登入方式</p>
    <GoogleLogin :callback="callback" />
    <br><br>
    <!-- <p>TokenResponseCallback</p>
    <GoogleLogin :callback="callback2">
      <button>Login with Google (TokenResponseCallback)</button>
    </GoogleLogin>
    <br><br> -->
    <p>取得token來獲取登入資訊</p>
    <van-button @click="login">googleTokenLogin</van-button>
    <!-- <p>googleAuthCodeLogin</p>
    <van-button @click="login2">googleAuthCodeLogin</van-button> -->
    <!-- <p>googleSdkLoaded</p>
    <van-button @click="login3">googleSdkLoaded</van-button> -->
  </div>
</div>
</template>

<style scoped>

</style>
@/plugins/gapi@/plugins/gapi