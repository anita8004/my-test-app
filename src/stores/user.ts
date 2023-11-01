import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const login_type = ref('')
  const token = ref('')
  const credential = ref('')
  const email = ref('')
  const email_verified = ref(false)
  const name = ref('')
  const picture = ref('')
  const exp = ref('')


  const clearUserInfo = () => {
    login_type.value = ''
    token.value = ''
    credential.value = ''
    email.value = ''
    email_verified.value = false
    name.value = ''
    picture.value = ''
    exp.value = ''
  }

  const getMe = () => {
    FB.api("/me", function (response) {
      console.log("me: ", response);
      name.value = response.name;
      email.value = response.email;
    });
  };

  const loginWithFB = async () => {
    const { authResponse } = await new Promise(FB.login)
    if (!authResponse) return
    console.log('loginWithFB authResponse: ', authResponse)
    login_type.value = 'facebook'
    token.value = authResponse.accessToken
    getMe()
    router.replace({ name: 'Home' })
  }

  const logoutWithFB = () => {
    FB.api('/me/permissions', 'delete', null, () => FB.logout());
  }

  return {
    login_type,
    token,
    credential,
    email,
    email_verified,
    name,
    picture,
    exp,
    clearUserInfo,
    loginWithFB,
    logoutWithFB
  }
})