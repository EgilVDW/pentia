import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const profile = ref(null)

  function setUserProfile(userData) {
    profile.value = userData
  }

  function clearUserProfile() {
    profile.value = null
  }

  return { profile, setUserProfile, clearUserProfile }
})