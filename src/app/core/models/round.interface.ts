import { Model } from "@burand/angular";

export interface Round extends Model {
  active: boolean;
  participants: Array<Participant>;
  winner?: Participant;
  quantityRound?: number;
}

export interface Participant {
  name: string;
  points: number;
}
