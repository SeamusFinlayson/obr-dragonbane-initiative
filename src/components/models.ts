export const ID = "uk.nboughton.obr-db-initiative"

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
  initiative: IInitCard[];
}