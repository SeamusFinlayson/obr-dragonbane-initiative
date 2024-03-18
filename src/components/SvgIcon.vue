<script setup lang="ts">
defineProps<{
  path: string;
  height?: number;
  width?: number;
}>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :height="height ? height : 24" :width="width ? width : 24">
    <path :d="path" />
  </svg>
</template>
