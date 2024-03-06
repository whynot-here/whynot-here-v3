<template>
  <div></div>
</template>
<script lang="ts" setup>
/*
 * data
 */

/*
 * props
 */

const props = defineProps({
  temp: {
    type: String,
    default: ''
  }
})
/*
 * emit / computed
 */
const emit = defineEmits([
  "templateEmits"
])
// const tempComputed = computed<any>(() => {
// })

/*
 * mounted
 */
onMounted(async () => {
  await nextTick(() => {
  });
});
/*
 * function
 */
</script>
<style lang="scss" scoped></style>
