<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const initLoadFB = () => {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src =
      "https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v18.0&appId=189264130891850";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

const getMe = () => {
  FB.api("/me", function (response) {
    console.log("me: ", response);
    userStore.name = response.name;
    userStore.email = response.email;
  });
};

const FBLogin = () => {
  FB.login(function (response) {
    console.log("login: ", response);
    if (response.authResponse) {
      userStore.login_type = 'facebook'
      console.log("Welcome!  Fetching your information.... ");
      getMe();
    }
  });
};

onMounted(() => {
  // initLoadFB();
  window.fbAsyncInit = function () {
    const FB = window.FB;
    FB.init({
      appId: "189264130891850",
      xfbml: true,
      version: "v18.0",
    });
    FB.getLoginStatus(({ authResponse }) => {
      if (authResponse) {
        console.log("authResponse: ", authResponse);
        userStore.token = authResponse.accessToken;
        getMe();
        router.replace({ name: "Home" });
      }
    });
  };
});
</script>

<template>
  <div>
    <!-- <div id="fb-root"></div>
    <div
      class="fb-login-button"
      data-width=""
      data-size=""
      data-button-type=""
      data-layout=""
      data-auto-logout-link="false"
      data-use-continue-as="false"
    ></div> -->
    <!-- <button class="btn btn-facebook" @click="login">
      <i class="fa fa-facebook mr-1"></i>
      Login with Facebook
    </button> -->
    <van-button class="btn btn-facebook" @click="FBLogin">FB Login</van-button>
    <div id="profile"></div>
  </div>
</template>

<style lang="scss" scoped>
.btn-facebook {
  background: #3b5998;
  color: #fff;

  &:hover {
    color: #fff;
    opacity: 0.8;
  }
}
</style>
