<script setup lang="ts">
import { googleTokenLogin, decodeCredential } from "@/plugins/gapi";
import type { CallbackTypes } from "@/plugins/gapi";
import { useUserStore } from "@/stores/user";
import router from "@/router";

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
        userStore.login_type = 'google'
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
  userStore.login_type = 'google'
  userStore.credential = response.credential;
  userStore.name = responsePayload.name;
  userStore.email = responsePayload.email;
  userStore.email_verified = responsePayload.email_verified;
  userStore.picture = responsePayload.picture;
  userStore.exp = responsePayload.exp;
  router.replace({ name: "Home" });
};

const FBLogin = () => {
  userStore.loginWithFB()
};
</script>

<template>
  <div class="page-login">
    <header>
      <h1>Login</h1>
    </header>
    <div class="login-list">
      <p>
        <GoogleLogin :callback="callback" />
      </p>
      <p>
        <van-button class="btn btn-google" size="normal" block @click="login">
          <template #icon>
            <font-awesome-icon :icon="['fab', 'google']" />
          </template>
          Login with google
        </van-button>
      </p>
      <p>
        <van-button class="btn btn-facebook" size="normal" block @click="FBLogin">
          <template #icon>
            <font-awesome-icon :icon="['fab', 'facebook-f']" />
          </template>
          Login with facebook
        </van-button>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.login-list {
  .btn {
    width: 280px;
    margin: 0 auto;
  }
}

.btn {
  border: 0;
}

.btn-facebook {
  background: #3b5998;
  color: #fff;

  &:hover {
    color: #fff;
    opacity: 0.8;
  }
}

.btn-google {
  background: #DB4437;
  color: #fff;

  &:hover {
    color: #fff;
    opacity: 0.8;
  }
}
</style>
