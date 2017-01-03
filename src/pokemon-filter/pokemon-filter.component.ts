import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
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

  filtered: PokemonListItem[];

  ngOnChanges(changes) {
    this.filtered = this.allPokemon;
    console.log("filter component just updated with ", changes);
    
  }

  executeFilters(searchTerm) {
    this.filtered = this.allPokemon;

    // Filter by filters first since it's faster time complexity than performing string search.
    this.filterByFilters();
    this.filterBySearch(searchTerm);

    this.filterPokemon.emit(this.filtered);
  }
  
  filterByFilters() {
    this.filtered = this.allPokemon;
  }

  filterBySearch(searchTerm) {
    // Do not alter this.filtered array if user deleted the search query
    if (searchTerm.length === 0) return;

    if (Number(searchTerm)*0 === 0) {
      this.filtered = searchByNumber(this.filtered, Number(searchTerm));
    } else {
      this.filtered = searchByName(this.filtered, searchTerm);
    }
  }


}
