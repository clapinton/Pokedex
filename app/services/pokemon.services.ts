import { Injectable } from '@angular/core';
import { PokemonListItem } from '../pokemon';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PokemonService {

  baseUrl: string = 'http://pokeapi.co/api/v2/pokemon?limit=721';

  constructor(private http: Http) {};

  getAllPokemon(): Observable<PokemonListItem[]> {
    //This is a cold Observable. It needs a subscriber in order to execute
    return this.http.get(this.baseUrl).map(this.extractData);
    // return Promise.resolve(HEROES);
  }

  extractData(res: Response) {
    let body = res.json();
    return body.results || {};
  }

}
