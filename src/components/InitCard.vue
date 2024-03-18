<script setup lang="ts">
import { ref } from 'vue';
import { IInitCard } from './models';
import { maxCards, setCardNumber, setKeepCard } from '../lib/initiativeList';

const props = defineProps<{
  card: IInitCard;
  id: string;
  index: number;
}>();

const n = ref(0); // Card number
const k = ref(false); // Keep card
const d = ref(false); // Mark turn done
const editCard = ref<HTMLDialogElement | null>(null);

const editOpen = () => {
  n.value = props.card.card;
  k.value = props.card.keep;
  d.value = false;
  editCard.value?.showModal();
};

const editDone = () => {
  if (n.value != props.card.card) setCardNumber(props.id, props.index, n.value);
  if (k.value != props.card.keep) setKeepCard(props.id, props.index, k.value);
  editCard.value?.close();
};
</script>

<template>
  <div :class="`init-card ${card.keep ? 'keep' : ''}`" @click="editOpen">
    {{ card.card === 0 ? '' : card.card }}
  </div>

  <dialog ref="editCard">
    <div class="card items-center justify-center">
      <input class="row full-width mb-md" type="number" v-model.number="n" :min="0" :max="maxCards" />

      <div class="row mb-md full-width items-center">
        <span class="col mr-sm">Keep Card</span>
        <input class="col" type="checkbox" v-model="k" />
      </div>

      <button class="row full-width" @click="editDone">DONE</button>
    </div>
  </dialog>
</template>
