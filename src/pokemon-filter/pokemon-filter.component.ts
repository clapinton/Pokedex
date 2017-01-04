import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { capitalize, searchByName, searchByNumber } from '../helpers';
import { allTypes, mappedPkmnTypes } from '../types'; 

@Component({
  selector: 'poke-filter',
  templateUrl: './pokemon-filter.html',
  styleUrls: ['pokemon-filter.css'],
})

export class PokemonFilterComponent {

  @Input() allPokemon: PokemonListItem[];
  @Output() filterPokemon = new EventEmitter();

  filtered: PokemonListItem[];

  // Needed to make allTypes available to the HTML template
  allPkmnTypes = allTypes;

  ngOnChanges(changes) {
    this.filtered = this.allPokemon;
    console.log("filter component just updated with ", changes);
    console.log(allTypes);
    
    
  }

  executeFilters(searchTerm) {
    this.filtered = this.allPokemon;

    // Filter by type first since it's faster time complexity than performing string search.
    this.filterByType();
    this.filterBySearch(searchTerm);

    this.filterPokemon.emit(this.filtered);
  }
  
  filterByType() {
    this.filtered = this.allPokemon;
  }

  onFilterByType(selectedType) {
    console.log(mappedPkmnTypes[selectedType]);
    
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
