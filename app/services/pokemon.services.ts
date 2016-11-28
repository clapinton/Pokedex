import { Injectable } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  baseUrlV1: string = 'http://pokeapi.co/api/v1';
  baseUrlV2: string = 'http://pokeapi.co/api/v2';

  constructor(private http: Http) {};

  getAllPokemon(): Observable<PokemonListItem[]> {
    //This is a cold Observable. It needs a subscriber in order to execute
    const allPokemonUrl = `${this.baseUrlV2}/pokedex/1`;
    return this.http.get(allPokemonUrl).map(this.extractAllPokemon);
  }

  extractAllPokemon(res: Response) {
    let body = res.json();
    console.log(body)
    return body.pokemon_entries || {};
  }

  getOnePokemonV1(pkmn): Observable<PokemonListItem> {
    console.log("pokemon is", pkmn)
    const pkmnUrl = `${this.baseUrlV1}/pokemon/${pkmn}`;
    return this.http.get(pkmnUrl).map(this.extractOnePokemon);
  }

  getOnePokemonV2(pkmn): Observable<PokemonListItem> {
    return this.http.get(pkmn.url).map(this.extractOnePokemon);
  }

  extractOnePokemon(res: Response) {
    let body = res.json();
    console.log("this is the data body: ", body);
    return body || {};
  }

}
