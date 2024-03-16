<script setup lang="ts">
defineProps<{
  card: number;
}>();
</script>

<template>
  <div class="init-card mb-sm">{{ card === 0 ? "" : card }}</div>
</template>

<style scoped>
.init-card {
  display: flexbox;
  align-content: center;
  background-color: white;
  color: black;
  border-radius: 5px;
  font-weight: bold;
  height: 1.5em;
  width: 1.5em;
}
</style>
