import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonListItem } from '../pokemon';

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

  capitalizeName(pkmnName) {
    return pkmnName.replace(/\b\w/g, l => l.toUpperCase());
  }

  formatPkmnId(pkmnId) {
    return ("00" + pkmnId).slice(-3);
  }
}
