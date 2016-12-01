import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { capitalize, formatPkmnId } from '../helpers';

@Component({
  moduleId: module.id, //needed for relative paths
  selector: 'poke-list',
  templateUrl: 'pokemon-list.html',
  styleUrls: ['pokemon-list.css'],
})

export class PokemonListComponent {

  @Input() allPokemon: PokemonListItem[];
  @Output() selectPokemon = new EventEmitter<PokemonListItem>();

  selectedPkmnId: number;


  onSelect(pkmn) {
    this.selectedPkmnId = pkmn; //Used to toggle class when selectedPkmn is the same as the pokemon item
    this.selectPokemon.emit(pkmn); //Outputs to app.component so it can trigger the getOnePkmn API call
  }

  // Making the helper functions available to the template
  capitalize = capitalize;
  formatPkmnId = formatPkmnId;
}
