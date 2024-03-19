import { IDs, IInitCard, Site } from '../components/models';

import OBR from '@owlbear-rodeo/sdk';

export const setupContextMenu = () => {
  OBR.contextMenu.create({
    id: `${IDs.Root}/context-menu`,
    icons: [
      {
        icon: `${Site.Path}/add.svg`,
        label: 'Add to Initiative',
        filter: {
          every: [
            { key: 'layer', value: 'CHARACTER' },
            { key: ['metadata', IDs.Meta], value: undefined },
          ],
        },
      },

      {
        icon: `${Site.Path}/remove.svg`,
        label: 'Remove from Initiative',
        filter: {
          every: [{ key: 'layer', value: 'CHARACTER' }],
        },
      },
    ],

    onClick(context) {
      const addToInit = context.items.every((item) => item.metadata[IDs.Meta] === undefined);
      if (addToInit) {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            item.metadata[IDs.Meta] = {
              label: item.name,
              initiative: <IInitCard[]>[
                {
                  card: 0,
                  keep: false,
                },
              ],
            };
          }
        });
      } else {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            delete item.metadata[IDs.Meta];
          }
        });
      }
    },
  });
};
