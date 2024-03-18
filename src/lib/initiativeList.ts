import OBR, { Item } from "@owlbear-rodeo/sdk";
import { IDs, IInitCard, IInitListItem } from "../components/models";
import { ref } from "vue";

export const initiativeItems = ref(<IInitListItem[]>[]);
export const maxCards = ref(10);

export const setupInitiativeList = () => {
  const renderList = (items: Item[]) => {
    initiativeItems.value = [];

    for (const item of items) {
      const metadata = item.metadata[IDs.Meta] as any;
      if (metadata) {
        initiativeItems.value.push({
          id: item.id,
          name: item.name,
          initiative: metadata.initiative as IInitCard[],
        });
      }
    }

    initiativeItems.value.sort(
      (a, b) => a.initiative[0].card - b.initiative[0].card
    );
  };

  OBR.scene.items.onChange(renderList);
};

export const drawCards = async () => {
  const cards: number[] = [];
  for (let i = 1; i <= maxCards.value; i++) cards.push(i);
  await OBR.scene.items.updateItems(
    (item): item is Item => (item.metadata[IDs.Meta] ? true : false),
    (items) => {
      // Splice out any kept cards
      for (let item of items) {
        const meta = item.metadata[IDs.Meta] as IInitListItem;
        meta.initiative.forEach((c) => {
          if (c.keep) {
            const i = cards.findIndex((n) => n === c.card);
            if (i > -1) cards.splice(i, 1);
          }
        });
      }

      // Draw the cards
      for (let item of items) {
        const meta = item.metadata[IDs.Meta] as IInitListItem;
        meta.initiative.forEach((_, i) => {
          if (cards.length === 0) {
            OBR.notification.show(
              "No more initiative cards, consider grouping some enemies.",
              "WARNING"
            );
            return;
          }

          if (!meta.initiative[i].keep) {
            const c = cards.splice(
              Math.floor(Math.random() * cards.length),
              1
            )[0];
            meta.initiative[i].card = c;
          }
        });
      }
    }
  );
};

export const setFerocity = async (id: string) => {
  const input = window.prompt("Set Ferocity");
  const ferocity = input === null ? 1 : +input;
  await OBR.scene.items.updateItems(
    (item): item is Item => item.id === id,
    (items) => {
      for (let item of items) {
        const meta = item.metadata[IDs.Meta] as IInitListItem;
        const cards: IInitCard[] = Array(+ferocity).fill({
          card: 0,
          keep: false,
        });
        cards.forEach((_, i) => (cards[i] = { card: 0, keep: false }));
        meta.initiative = cards;
      }
    }
  );
};

export const markDone = async (id: string, index: number) =>
  await OBR.scene.items.updateItems(
    (item): item is Item => item.id === id,
    (items) => {
      for (let item of items) {
        const meta = item.metadata[IDs.Meta] as IInitListItem;
        meta.initiative[index].card = 0;
      }
    }
  );

export const setKeepCard = async (id: string, index: number, value: boolean) =>
  await OBR.scene.items.updateItems(
    (item): item is Item => item.id === id,
    (items) => {
      for (let item of items) {
        const meta = item.metadata[IDs.Meta] as IInitListItem;
        meta.initiative[index].keep = value;
      }
    }
  );

export const setCardNumber = async (id: string, index: number, value: number) =>
  await OBR.scene.items.updateItems(
    (item): item is Item => item.id === id,
    (items) => {
      for (let item of items) {
        const meta = item.metadata[IDs.Meta] as IInitListItem;
        meta.initiative[index].card = value;
      }
    }
  );
