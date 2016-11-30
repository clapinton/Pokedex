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

  selectedPkmn: PokemonListItem;


  onSelect(pkmn: PokemonListItem) {
    this.selectPokemon.emit(pkmn);
    // this.selectedPkmn = pkmn;
  }

  // Making the helper functions available to the template
  capitalize = capitalize;
  formatPkmnId = formatPkmnId;
}
