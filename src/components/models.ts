export const ID = "uk.nboughton.obr-db-initiative"

export enum Site {
  Path = "/apps/obr-dragonbane-initiative"
}

export enum IDs {
  Root = ID,
  Meta = `${ID}/metadata`
}

export interface IInitCard {
  card: number;
  keep: boolean;
}

export interface IInitListItem {
  id: string;
  name: string,
  label: string,
  initiative: IInitCard[];
}