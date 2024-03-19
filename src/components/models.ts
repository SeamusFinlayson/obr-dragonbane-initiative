export const ID = "uk.nboughton.obr-db-initiative"

export enum Site {
  Path = "/apps/obr-dragonbane-initiative"
}

export enum IDs {
  Root = ID,
  Meta = `${ID}/metadata`
}

export interface InitCard {
  card: number;
  keep: boolean;
}

export interface StatTrack {
  max: number;
  cur: number;
}

export interface InitListItem {
  id: string;
  name: string,
  initiative: InitCard[];
  hp: StatTrack;
  wp: StatTrack;
}