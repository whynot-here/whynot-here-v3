<template>
  <div>
    <h1>Home</h1>
    <div v-if="userInfo">
      user 정보 <br>
      {{ userInfo }}
    </div><br/><br/>
    <a @click="login">login</a> <br/><br/>
    <a @click="logout">logout</a>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const common = mainCommon();
const { userInfo } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  await nextTick(() => {
    // 소셜로그인 리턴 받았을 때
    if (route.query.accessToken !== undefined) {
      common.setCookie('token', route.query.accessToken, 8760);
      common.goHome();
    }
  });
});


function login() {
  router.push("/login");
}
function logout () {
  logUserOut();
  router.push("/login");
};

definePageMeta({
  middleware: "auth",
});
</script>