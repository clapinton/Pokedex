import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { searchByName, searchByNumber } from '../helpers';

@Component({
  selector: 'poke-filter',
  templateUrl: './pokemon-filter.html',
  styleUrls: ['pokemon-filter.css'],
})

export class PokemonFilterComponent {

  @Input() allPokemon: PokemonListItem[];
  @Output() filterPokemon = new EventEmitter();

  searchPokemon(searchTerm) {

      let filtered = []

    if (searchTerm === '') {
      filtered = this.allPokemon;
    } else if (Number(searchTerm)*0 === 0) {
      filtered = searchByNumber(this.allPokemon, Number(searchTerm));
    } else {
      filtered = searchByName(this.allPokemon, searchTerm);
    }

    this.filterPokemon.emit(filtered);
  }

}
