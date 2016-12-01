//It is the root component of what will become a tree of nested components as the application evolves.

import { Component } from '@angular/core';
import { PokemonListItem } from './pokemon';
import { PokemonService } from './services/pokemon.services';
import { OnInit } from '@angular/core';

@Component({
  selector: 'pokedex-app',
  providers: [PokemonService],
  template: `
    <main class="pokedex">

      <div class="pokedex-title box box-blue stripes">
        <img src='../assets/images/8-bit-pokeball.png'/>
        <h1>ngPokedex</h1>
        <img src='../assets/images/8-bit-pokeball.png'/>
      </div>

      <div *ngIf="!allPokemon" class="loading">
        <img src="/assets/images/pikachu-waiting.gif"/>
        <p>Loading...</p>
      </div>

      <div class="pokedex-body">
        <poke-list [allPokemon]="allPokemon" (selectPokemon)='selectPokemon($event)'></poke-list>
        <pokemon-detail [pkmn]="selectedPkmn" [listClick]="listClick"></pokemon-detail>

      </div>

    </main>
    `
})

export class AppComponent implements OnInit {

  //This is the same as writing a constructor and setting this.hero.name and this.hero.id
  selectedPkmn: PokemonListItem;
  //
  allPokemon: PokemonListItem[];

  listClick: boolean = false; //If true, shows the loading spinner. Set to false when API call returns

  constructor(private pokemonServices: PokemonService) {};

  ngOnInit(): void {
    this.getAllPokemon();
  }

  getAllPokemon(): void {
    //When we subscribe, the Observable service runs
    this.pokemonServices.getAllPokemon().subscribe( pkmns => this.allPokemon = pkmns );
  }

  selectPokemon(pkmn: number) {
    this.selectedPkmn = null;
    this.listClick = true;

    this.pokemonServices.getOnePokemonV2(pkmn).subscribe( pokemon => {
      this.selectedPkmn = pokemon;

      const pkmnSpecies = pokemon.species;
      this.pokemonServices.getPokemonDescription(pkmnSpecies)
        .subscribe( description => {
          this.selectedPkmn.description = description;
          this.listClick = false;
      });
    })
  }
}
