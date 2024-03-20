<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { v4 as uid } from 'uuid';

const props = defineProps<{
  path: string;
  height?: number;
  width?: number;
  fillPc?: number;
}>();

const id = ref(uid());
const percent = ref(props.fillPc ? Math.floor(props.fillPc * 100) : 100);
const color1 = ref('#60ba62');
const color2 = ref('red');

const setValues = () => {
  if (props.fillPc) {
    percent.value = Math.floor(props.fillPc * 100);
    color1.value = document.documentElement.style.getPropertyValue('--primary-light');
    color2.value = document.documentElement.style.getPropertyValue('--primary-dark');
    id.value = uid();
  }
};

watch(
  () => props.fillPc,
  () => setValues()
);

onMounted(() => setValues());
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :height="height ? height : 24" :width="width ? width : 24">
    <linearGradient v-if="fillPc" :id="`lg-${id}`" x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0%" :stop-color="color1" />
      <stop :offset="`${percent}%`" :stop-color="color1" />
      <stop :offset="`${percent}%`" :stop-color="color2" />
      <stop offset="100%" :stop-color="color2" />
    </linearGradient>
    <path v-if="fillPc" :d="path" :fill="`url(#lg-${id})`" />
    <path v-else :d="path" />
  </svg>
</template>
