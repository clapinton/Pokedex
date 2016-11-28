export class PokemonListItem {
  id: number;
  name: string;
  species: Object;
  description: string;
  sprite: string;
  height: number;
  weight: number;
  types: Object[];
  games: Object[];
  baseStats: BaseStat[];
  moves: Move[];
}

export class BaseStat {
  name: string;
  value: number;
}

export class Move {
  name: string;
  type: string;
  learnBy: string; //level-up, egg, tutor, machine, stadium-surfing-pikachu, light-ball-egg, colosseum-purification, xd-shadow, xd-purification
  levelLearned: number;
}

export class PokemonItem {
  name: string;
}
