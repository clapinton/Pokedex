import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { searchByName, searchByNumber } from '../helpers';
import { allTypes, pkmnTypesInfo } from '../types'; 

@Component({
  selector: 'poke-filter',
  templateUrl: './pokemon-filter.html',
  styleUrls: ['pokemon-filter.css'],
})

export class PokemonFilterComponent {

  @Input() allPokemon: PokemonListItem[];
  @Output() filterPokemon = new EventEmitter();

  pkmnQuery: String = "";
  pkmnFilteredByType: number[] = [];
  typeFilter: String = "all";
  filtered: PokemonListItem[];

  // Needed to make allTypes available to the HTML template
  allTypes = allTypes;
  pkmnTypesInfo = pkmnTypesInfo;

  ngOnChanges(changes) {
    this.filtered = this.allPokemon;
  }

  onPkmnQueryChange(searchTerm) {
    this.pkmnQuery = searchTerm;
    this.executeFilters();
  }

  onFilterByType(selectedType) {
    this.typeFilter = selectedType;
    if (selectedType === "all") {
      this.pkmnFilteredByType = [];
    } else {
      this.pkmnFilteredByType = pkmnTypesInfo[selectedType].pkmnList;
    }
    this.executeFilters();
  }

  executeFilters() {

    // Filter by type first since it's faster time complexity than performing string search.
    this.filterByType();
    this.filterBySearch();

    this.filterPokemon.emit(this.filtered);
  }

  filterByType() {
    if (this.pkmnFilteredByType.length === 0) {
      //If no type filter selected, then proceed to filter by query using allPokemon
      this.filtered = this.allPokemon; 
    } else {
      //If a type filter is selected, add the pkmn to the array 
      this.filtered = [];
      let idx;
      this.pkmnFilteredByType.forEach( pkmnId => {
        //The pkmnId is translated to the array index by subtracting 1 (ex.: Bulba becomes 0)
        idx = pkmnId - 1;
        this.filtered.push(this.allPokemon[idx]);
      });
    }
  }
  
  filterBySearch() {
    // Do not alter this.filtered array if user deleted the search query
    if (this.pkmnQuery.length === 0) return;

    if (Number(this.pkmnQuery)*0 === 0) {
      this.filtered = searchByNumber(this.filtered, Number(this.pkmnQuery));
    } else {
      this.filtered = searchByName(this.filtered, this.pkmnQuery);
    }
  }

}
