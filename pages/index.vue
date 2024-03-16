<template>
  <div>
    <h1>Home</h1>
    <div v-if="userInfo">
      user 정보 <br>
      {{ userInfo }}
    </div>
    <a @click="logout">logout</a>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const { userInfo } = storeToRefs(useAuthStore());
const { logUserOut } = useAuthStore();
const router = useRouter();


function logout () {
  logUserOut();
  router.push("/login");
};

definePageMeta({
  middleware: "auth",
});
</script>