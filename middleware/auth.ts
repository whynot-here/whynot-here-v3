import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import jwtDecode from "jwt-decode";
import { useUserFecth } from "~/fetch/useUserFetch";

const { setUserInfo } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

export default defineNuxtRouteMiddleware((to, from) => {
  const { getUserInfo } = useUserFecth();
  const token = useCookie("token");
  let info: any;

  if (token.value) {
    authenticated.value = true;
    
    // jwtDecode(token.value);
    
    // userInfo end point
    getUserInfo().then((result: any) => {
      info = result;
      setUserInfo(info)
    }).catch((error: any) => {
      console.log(error)
    });
  }

  // console.log(to?.name)
  const excludePage = [
    'index'
  ]
  // login 안 되어 있을 때
  if (!token.value && !excludePage.some((value: string) => {return value === to.name})) {
    abortNavigation();
    return navigateTo({path: '/login'}, { external: true });
  }
})