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
        <img src="http://orig05.deviantart.net/20e3/f/2014/227/0/0/pikahcu_pokemon_x_and_y_by_wittnebenbrian-d7v97vf.gif"/>
        <p>Loading...</p>
      </div>

      <div class="pokedex-body">
        <poke-list [allPokemon]="allPokemon" (selectPokemon)='selectPokemon($event)'></poke-list>
        <pokemon-detail [pkmn]="selectedPkmn"></pokemon-detail>

      </div>

    </main>
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
    this.pokemonServices.getOnePokemonV2(pkmn).subscribe( pokemon => {
      this.selectedPkmn = pokemon;

      const pkmnSpecies = pokemon.species;
      this.pokemonServices.getPokemonDescription(pkmnSpecies)
        .subscribe( description => {
          this.selectedPkmn.description = description;
      });
    })
  }
}
