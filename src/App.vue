<script setup lang="ts">
import InitCard from './components/InitCard.vue';
import SvgIcon from './components/SvgIcon.vue';

import { ref } from 'vue';

import { IInitListItem } from './components/models';

import OBR from '@owlbear-rodeo/sdk';
import { mdiCog } from '@mdi/js';

import { setupTheme } from './lib/theme';
import { setupContextMenu } from './lib/contextMenu';
import { initiativeItems, setupInitiativeList, maxCards, drawCards, setFerocity, setLabel } from './lib/initiativeList';

// Template refs
const configDialog = ref<HTMLDialogElement | null>(null);
const charDialog = ref<HTMLDialogElement | null>(null);
const charFerocity = ref(1);
const charLabel = ref('');

// Control values
let charID = '';
let charItem = <IInitListItem>{
  id: 'placeholder',
  name: 'placeholder',
  label: 'placeholder',
  initiative: [],
};

// Operations
const charOpen = (item: IInitListItem) => {
  charFerocity.value = item.initiative.length;
  charLabel.value = item.label;
  charID = item.id;
  charItem = JSON.parse(JSON.stringify(item)); // Javascript passes by reference so we want a decoupled copy here
  charDialog.value?.showModal();
};
const charDone = async () => {
  if (charLabel.value !== charItem.label) await setLabel(charID, charLabel.value);
  if (charFerocity.value !== charItem.initiative.length) await setFerocity(charID, charFerocity.value);
  charDialog.value?.close();
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
    <div class="col mr-md init-title" @click="charOpen(item)">
      {{ item.label ? item.label : item.name }}
    </div>

    <div class="col">
      <div class="row">
        <InitCard v-for="(card, j) in item.initiative" :key="`card-${j}`" :card="card" :id="item.id" :index="j" />
      </div>
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

  <dialog ref="charDialog">
    <div class="card items-center justify-center">
      <div class="row mb-md"><strong>Set Label</strong></div>
      <input class="row full-width mb-md" type="text" v-model="charLabel" />

      <div class="row mb-md"><strong>Set Ferocity</strong></div>
      <input class="row full-width mb-md" type="number" v-model.number="charFerocity" :min="1" />

      <button class="row full-width" @click="charDone()">DONE</button>
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
