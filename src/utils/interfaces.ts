export interface Card {
  link: string | null;
  name: string;
  src: string;
}

export interface FSCard extends Card {
  tags: string[];
}

export interface FSDeck {
  name: string;
  cards: string[];
}

export interface FSTagData {
  name: string;
  cards: string[];
}

export interface Deck {
  name: string;
  cards: Card[];
}
