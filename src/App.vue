<script setup lang="ts">
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./lib/contextMenu";
import {
  initiativeItems,
  setupInitiativeList,
  drawCards,
  setFerocity,
} from "./lib/initiativeList";

import InitCard from "./components/InitCard.vue";

OBR.onReady(() => {
  setupContextMenu();
  setupInitiativeList();
});
</script>

<template>
  <div class="col justify-evenly">
    <h2>Initiative</h2>

    <div
      class="row justify-between items-center mb-sm init-row"
      v-for="(item, i) in initiativeItems"
      :key="`init-item-${i}`"
    >
      <div class="col mr-sm init-title" @click="setFerocity(item.id)">
        {{ item.name }}
      </div>

      <div
        class="col mr-sm init-card items-center justify-center"
        v-for="(card, j) in item.initiative"
        :key="`card-${j}`"
      >
        <InitCard
          :card="card"
          :id="item.id"
          :index="j"
        />
      </div>
    </div>

    <button class="draw-btn" @click="drawCards">Draw Initiative</button>
  </div>
</template>

<style scoped>
.init-card,
.init-title {
  cursor: pointer;
}

.init-row {
  padding: 1em;
  border-radius: 10px;
  background-color: rgb(58, 58, 58);
  box-shadow: 1px 1px 1px 1px rgb(35, 35, 35);
}
</style>
