<script setup lang="ts">
import { onMounted } from "vue";
import { handleResizeLayout } from "../helpers";

onMounted(() => {
  handleResizeLayout();
  window.addEventListener("resize", () => handleResizeLayout());
});
</script>

<template>
  <slot name="content"></slot>
</template>

<style lang="scss" scoped></style>
