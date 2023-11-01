<script setup lang="ts">
import { googleTokenLogin, decodeCredential } from "@/plugins/gapi";
import type { CallbackTypes } from "@/plugins/gapi";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import FBLoginButton from "@/plugins/fbapi/FBLoginButton.vue";

const userStore = useUserStore();

const login = () => {
  googleTokenLogin().then((response) => {
    console.log("googleTokenLogin response: ", response);
    userStore.token = response.access_token;
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${response.token_type} ${response.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result: ", result);
        userStore.name = result.name;
        userStore.email = result.email;
        userStore.email_verified = result.email_verified;
        userStore.picture = result.picture;
        userStore.exp = result.exp;
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    router.replace({ name: "Home" });
  });
};

const callback: CallbackTypes.CredentialCallback = (response) => {
  console.log("CredentialCallback: ", response);
  const responsePayload: any = decodeCredential(response.credential);
  console.log("responsePayload: ", responsePayload);
  userStore.credential = response.credential;
  userStore.name = responsePayload.name;
  userStore.email = responsePayload.email;
  userStore.email_verified = responsePayload.email_verified;
  userStore.picture = responsePayload.picture;
  userStore.exp = responsePayload.exp;
  router.replace({ name: "Home" });
};

const FBLogin = () => {
  window.FB.login(function (response) {
    console.log(response);
  });
};
</script>

<template>
  <div class="page-login">
    <header>
      <h1>Login</h1>
    </header>
    <div class="login-list">
      <p>google建議的登入方式</p>
      <GoogleLogin :callback="callback" />
      <br /><br />
      <p>取得token來獲取登入資訊</p>
      <van-button @click="login">googleTokenLogin</van-button>
      <!-- <van-button @click="FBLogin">FB Login</van-button> -->
      <FBLoginButton />
    </div>
  </div>
</template>

<style scoped></style>
