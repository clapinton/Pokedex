import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../pokemon';


@Component ({
  // moduleId: module.id, //needed for relative paths
  selector: 'pokemon-detail',
  templateUrl: 'pokemon-detail.html',
  styleUrls: ['pokemon-detail.css'],
})

export class PokemonDetailComponent {
  //Notation to clarify that pkmn is an input to the component
  @Input() pkmn: PokemonListItem;
  @Input() fetchingStatus: string;

  formatPkmnId(pkmnId) {
    return ("00" + pkmnId).slice(-3);
  }

}
