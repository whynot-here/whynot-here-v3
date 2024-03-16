import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import jwtDecode from "jwt-decode";

const { setUserInfo } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token");
  let info: any;

  if (token.value) {
    authenticated.value = true;
    
    info = jwtDecode(token.value);
    const userInfo: { [key: string]: any } = {
      authType: '',
      authenticated: false,
      email: '',
      id: -1,
      nickname: '',
      profileImg: null,
      roles: [],
      studentType: null,
    }

    Object.keys(userInfo).forEach((key) => {
      if (info[key]) {
        userInfo[key] = info[key];
      }
    });

    setUserInfo(info)
  }

  console.log(to?.name)
  // login 안 되어 있을 때
  if (!token.value) {
    abortNavigation();
    return navigateTo(`${useRuntimeConfig().public.frontUrl}/login`, { external: true });
  }
})