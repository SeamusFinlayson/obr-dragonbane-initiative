<script setup lang="ts">
import { ref } from 'vue';
import OBR from '@owlbear-rodeo/sdk';
import { setupContextMenu } from './lib/contextMenu';
import { initiativeItems, setupInitiativeList, maxCards, drawCards, setFerocity } from './lib/initiativeList';

import InitCard from './components/InitCard.vue';
import SvgIcon from './components/SvgIcon.vue';
import { mdiCog } from '@mdi/js';
import { setupTheme } from './lib/theme';
import { IInitListItem } from './components/models';

const configDialog = ref<HTMLDialogElement | null>(null);

const ferocityDialog = ref<HTMLDialogElement | null>(null);
const ferocity = ref(1);
const ferocityID = ref('');
const ferocityOpen = (item: IInitListItem) => {
  ferocity.value = item.initiative.length;
  ferocityID.value = item.id;
  ferocityDialog.value?.showModal();
};
const ferocityDone = () => {
  setFerocity(ferocityID.value, ferocity.value);
  ferocityDialog.value?.close();
};

OBR.onReady(() => {
  setupTheme(), setupContextMenu();
  setupInitiativeList();
});
</script>

<template>
  <div class="row items-center justify-between">
    <h2>Dragonbane Initiative</h2>
  </div>

  <div class="row items-center mb-sm">
    <strong class="mr-sm">Max. Cards: {{ maxCards }}</strong>
    <SvgIcon class="cog-btn" :path="mdiCog" @click="configDialog?.showModal()" />
  </div>

  <div class="mb-sm init-row" v-for="(item, i) in initiativeItems" :key="`init-item-${i}`">
    <div class="col mr-md init-title" @click="ferocityOpen(item)">
      {{ item.name }}
    </div>

    <div class="col mr-sm init-card items-center justify-end" v-for="(card, j) in item.initiative" :key="`card-${j}`">
      <InitCard :card="card" :id="item.id" :index="j" />
    </div>
  </div>

  <button class="row init-btn mt-md" @click="drawCards">DRAW INITIATIVE</button>

  <dialog ref="configDialog">
    <div class="card items-center justify-center">
      <div class="row mb-md"><strong>Set Max. Cards</strong></div>
      <input class="row full-width mb-md" type="number" v-model.number="maxCards" />
      <button class="row full-width" @click="configDialog?.close()">DONE</button>
    </div>
  </dialog>

  <dialog ref="ferocityDialog">
    <div class="card items-center justify-center">
      <div class="row mb-md"><strong>Set Ferocity</strong></div>
      <input class="row full-width mb-md" type="number" v-model.number="ferocity" :min="1" />
      <button class="row full-width" @click="ferocityDone()">DONE</button>
    </div>
  </dialog>
</template>

<style scoped>
.init-card,
.init-title,
.cog-btn {
  cursor: pointer;
}
</style>
