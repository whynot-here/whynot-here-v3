import { useFetchCommon } from "./useFetchCommon";

export const useUserFecth = () => {
  const apiUrl = useRuntimeConfig().public.apiUrl;
  const { fetch_get, fetch_post, fetch_put, fetch_delete, fetch_form } = useFetchCommon();

  async function formLogin(email:string, password: string) {
    return await fetch_post({
      url: `${apiUrl}/v2/sign-in`,
      body: {
        email,
        password
      }
    })
  }

  return {
    formLogin
  }
}