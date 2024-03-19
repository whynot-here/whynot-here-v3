<template>
  <div>
    <h1>한대소</h1>
    <div v-if="userInfo">
      user 정보 <br>
      {{ userInfo }}
    </div><br/><br/>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth";
const { userInfo } = storeToRefs(useAuthStore());
definePageMeta({
  middleware: "auth",
});
</script>