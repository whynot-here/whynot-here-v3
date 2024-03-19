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
const { userInfo } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();
const router = useRouter();

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