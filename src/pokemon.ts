export class PokemonListItem {
  id: number;
  stringId: string;
  name: string;
  species: Object;
  description: string;
  sprite: string;
  height: number;
  weight: number;
  types: Object[];
  games: Object[];
  generations: Object[];
  baseStats: BaseStat[];
  moves: Move[];
}

export class BaseStat {
  base_stat: number;
  percent: number;
  stat: string;
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
