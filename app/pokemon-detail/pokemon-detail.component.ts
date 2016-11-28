import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../pokemon';


@Component ({
  moduleId: module.id, //needed for relative paths
  selector: 'pokemon-detail',
  templateUrl: `pokemon-detail.html`,
})

export class PokemonDetailComponent {
  //Notation to clarify that hero is an input to the component
  @Input()
  pkmn: PokemonListItem;
};
