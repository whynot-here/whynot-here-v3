<template>
  <div>
    <h1>Home</h1>
    <a @click="logout">logout</a>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
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