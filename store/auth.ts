import { defineStore } from "pinia"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    userInfo: {
      authType: '',
      authenticated: false,
      email: '',
      id: -1,
      nickname: '',
      profileImg: null,
      roles: [],
      studentType: null,
    }
  }),
  actions: {
    logUserOut() {
      const token = useCookie("token");
      this.authenticated = false;
      token.value = null;
      this.userInfo = {
        authType: '',
        authenticated: false,
        email: '',
        id: -1,
        nickname: '',
        profileImg: null,
        roles: [],
        studentType: null,
      }
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    }
  }
})