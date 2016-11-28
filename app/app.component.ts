//It is the root component of what will become a tree of nested components as the application evolves.

import { Component } from '@angular/core';
import { PokemonListItem } from './pokemon';
import { PokemonService } from './services/pokemon.services';
import { OnInit } from '@angular/core';

@Component({
  selector: 'pokedex-app',
  providers: [PokemonService],
  template: `
    <div class="pokedex">
      <poke-list [allPokemon]="allPokemon" (selectPokemon)='selectPokemon($event)'></poke-list>
      <pokemon-detail [pkmn]="selectedPkmn"></pokemon-detail>
    </div>
    `
})

export class AppComponent implements OnInit {

  //This is the same as writing a constructor and setting this.hero.name and this.hero.id
  selectedPkmn: PokemonListItem;
  //
  allPokemon: PokemonListItem[];

  constructor(private pokemonServices: PokemonService) {};

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getAllPokemon(): void {
    //When we subscribe, the Observable service runs
    this.pokemonServices.getAllPokemon().subscribe( pkmns => this.allPokemon = pkmns );
  }

  selectPokemon(pkmn: number) {
    this.pokemonServices.getOnePokemonV1(pkmn).subscribe( pokemon => this.selectedPkmn = pokemon )
  }
}
