<script setup lang="ts">
import { ref } from "vue";
import { IInitCard } from "./models";
import { setCardNumber, setKeepCard } from "../lib/initiativeList";

const props = defineProps<{
  card: IInitCard;
  id: string;
  index: number;
}>();

const n = ref(props.card.card);
const k = ref(props.card.keep);
const editCard = ref<HTMLDialogElement | null>(null);

const editOpen = () => {
  n.value = props.card.card
  k.value = props.card.keep
  editCard.value?.showModal()
}

const editDone = () => {
  if (n.value != props.card.card) setCardNumber(props.id, props.index, n.value);
  if (k.value != props.card.keep) setKeepCard(props.id, props.index, k.value);
  editCard.value?.close();
};
</script>

<template>
  <div
    :class="`init-card ${card.keep ? 'keep' : ''}`"
    @click="editOpen"
  >
    {{ card.card === 0 ? "" : card.card }}
  </div>

  <dialog ref="editCard">
    <h4 class="row">Edit Card</h4>

    <div class="row mb-sm">
      <input class="col" type="number" v-model.number="n" :min="0" :max="10" />
    </div>

    <div class="row mb-sm">
      <span class="col">Keep Card</span
      ><input class="col" type="checkbox" v-model="k" />
    </div>

    <div class="row justify-end">
      <button class="col" @click="editDone">Done</button>
    </div>
  </dialog>
</template>

<style scoped>
.init-card {
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: white;
  color: black;
  border-radius: 5px;
  font-weight: bold;
  height: 1.5em;
  width: 1.5em;
}

.keep {
  background-color: rgb(118, 118, 118);
}

dialog {
  border: 1px solid grey;
  border-radius: 10px;
  background-color: rgb(58, 58, 58);
}
</style>
