import { ref } from 'vue'
import { defineStore } from 'pinia'

// export const useAppStore = defineStore({
//   id: 'app',
//   state: () => ({
//     web_name: 'Test App'
//   }),
//   getters: {},
//   actions: {}
// })

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const credential = ref('')
  const email = ref('')
  const email_verified = ref(false)
  const name = ref('')
  const picture = ref('')
  const exp = ref('')


  const clearUserInfo = () => {
    token.value = ''
    credential.value = ''
    email.value = ''
    email_verified.value = false
    name.value = ''
    picture.value = ''
    exp.value = ''
  }

  return {
    token,
    credential,
    email,
    email_verified,
    name,
    picture,
    exp,
    clearUserInfo
  }
})