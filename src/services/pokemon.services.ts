import { Injectable } from '@angular/core';
import { PokemonListItem, BaseStat, Move } from '../pokemon';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {
  extractAllPokemon,
  extractOnePokemon,
  extractStats,
  extractDescription,
  extractMoveType
} from './extractors';
import { GAMES_GENERATIONS, BIGGEST_BASE_STATS } from '../poke-constants';
import {
  capitalize,
  formatPkmnId,
  removeDashCapitalize,
  calculatePercent,
} from '../helpers';
import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  baseUrlV1: string = 'https://pokeapi.co/api/v1';
  baseUrlV2: string = 'https://pokeapi.co/api/v2';


  constructor(private http: Http) {};

  getAllPokemon(): Observable<PokemonListItem[]> {
    //This is a cold Observable. It needs a subscriber in order to execute
    const allPokemonUrl = `${this.baseUrlV2}/pokedex/1`;
    return this.http.get(allPokemonUrl).map(extractAllPokemon);
  }

  // getOnePokemonV1(pkmn): Observable<PokemonListItem> {
  //   console.log("pokemon is", pkmn)
  //   const pkmnUrl = `${this.baseUrlV1}/pokemon/${pkmn}`;
  //   return this.http.get(pkmnUrl).map(this.extractOnePokemon);
  // }

  getOnePokemonV2(pkmn): Observable<PokemonListItem> {
    const onePokemonUrl = `${this.baseUrlV2}/pokemon/${pkmn}`;
    return this.http.get(onePokemonUrl).map(extractOnePokemon);
  }

  getPokemonDescription(pkmnSpecies): Observable<string> {
    return this.http.get(pkmnSpecies.url).map(extractDescription);
  }

  // This returns before the API result. Need to rework to account for async response
  getMoveType(move): string {
    let moveType;
    let observable = this.http.get(move.url).map(extractMoveType);
    observable.subscribe(type => moveType = type);
    return moveType;
  }

}
