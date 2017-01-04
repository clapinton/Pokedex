import { Component } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { PokemonService } from '../services/pokemon.services';
import { OnInit } from '@angular/core';


@Component({
  selector: 'pokedex-app',
  providers: [PokemonService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //This is the same as writing a constructor and setting this.hero.name and this.hero.id
  selectedPkmn: PokemonListItem;
  //
  allPokemon: PokemonListItem[];
  filteredPokemon: PokemonListItem[];

  fetchingStatus: string = null; //If true, shows the loading spinner. Set to false when API call returns

  constructor(private pokemonServices: PokemonService) {};

  ngOnInit(): void {
    this.getAllPokemon();
    this.getAllTypes();
  }

  getAllPokemon(): void {
    //When we subscribe, the Observable service runs
    this.pokemonServices.getAllPokemon().subscribe( pkmns => {
      this.allPokemon = pkmns 
      this.filteredPokemon = pkmns 
    });
  }

  getAllTypes(): void {
    this.pokemonServices.getAllTypes().subscribe( types => {
    })
  }

  filterPokemon(pokemonList):void {
    // If the filter returns null, that means we are not filtering anything.
    this.filteredPokemon = (pokemonList) ? pokemonList : this.allPokemon; 
  }

  selectPokemon(pkmn: number) {
    this.selectedPkmn = null;
    this.fetchingStatus = 'Pokemon';

    this.pokemonServices.getOnePokemonV2(pkmn).subscribe( pokemon => {
      this.selectedPkmn = pokemon;
      this.fetchingStatus = 'description';

      const pkmnSpecies = pokemon.species;
      this.pokemonServices.getPokemonDescription(pkmnSpecies)
        .subscribe( description => {
          this.selectedPkmn.description = description;
          this.fetchingStatus = null;
      });
    })
  }
}
