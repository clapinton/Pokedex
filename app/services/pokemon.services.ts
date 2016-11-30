import { Injectable } from '@angular/core';
import { PokemonListItem, BaseStat, Move } from '../pokemon';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
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

  baseUrlV1: string = 'http://pokeapi.co/api/v1';
  baseUrlV2: string = 'http://pokeapi.co/api/v2';


  constructor(private http: Http) {
    this.extractOnePokemon = this.extractOnePokemon.bind(this);
  };

  getAllPokemon(): Observable<PokemonListItem[]> {
    //This is a cold Observable. It needs a subscriber in order to execute
    const allPokemonUrl = `${this.baseUrlV2}/pokedex/1`;
    return this.http.get(allPokemonUrl).map(this.extractAllPokemon);
  }

  extractAllPokemon(res: Response) {
    let body = res.json();
    return body.pokemon_entries || {};
  }

  // getOnePokemonV1(pkmn): Observable<PokemonListItem> {
  //   console.log("pokemon is", pkmn)
  //   const pkmnUrl = `${this.baseUrlV1}/pokemon/${pkmn}`;
  //   return this.http.get(pkmnUrl).map(this.extractOnePokemon);
  // }

  getOnePokemonV2(pkmn): Observable<PokemonListItem> {
    const onePokemonUrl = `${this.baseUrlV2}/pokemon/${pkmn}`;
    return this.http.get(onePokemonUrl).map(this.extractOnePokemon);
  }

  extractOnePokemon(res: Response): PokemonListItem {

    const extractStats:BaseStat[] = stats => {
      let allStats = [];
      stats.forEach( (st, idx) => {
        let newStat = new BaseStat();

        newStat['stat'] = removeDashCapitalize(st.stat.name);
        let biggestStat = BIGGEST_BASE_STATS[st.stat.name];
        newStat['base_stat'] = st.base_stat;
        newStat['percent'] = calculatePercent(biggestStat, st.base_stat);

        allStats.push(newStat);
      });

      let totalStat = new BaseStat();
      totalStat['stat'] = "Total";
      totalStat['base_stat'] =
        allStats.reduce( (sum, stat) => sum+= stat.base_stat, 0);
      let biggestStat = BIGGEST_BASE_STATS['total'];
      totalStat['percent'] = calculatePercent(biggestStat, totalStat['base_stat']);

      allStats.push(totalStat);

      console.log("This is the extracted allStats: ", allStats);
      return allStats;
    }

    const extractMoves = moves => {
      let allMoves = [];
      moves.forEach( (mv, idx) => {
        let eachMove = new Move();
        eachMove.name = mv.move.name;
        // Need to change the getType function to account for the async run
        // eachMove.type = this.getMoveType(mv.move);
        eachMove.learnBy = mv.version_group_details[0].move_learn_method.name;
        eachMove.levelLearned = 0;
        if (eachMove.learnBy === "level-up"){
          eachMove.levelLearned = mv.version_group_details[0].level_learned_at;
        }

        allMoves[idx] = eachMove;
      })
      console.log("This is the extracted allMoves: ", allMoves);
      return allMoves;
    }

    const calculateGenerations = games => {
      let gens = [];
      games.forEach(game => {
        // debugger
        let gen = GAMES_GENERATIONS[game.name];
        if (!gens.find( g => g.name === gen.name)) gens.push(gen);
      })
      return gens.reverse();
    }


    let body = res.json();
    console.log("this is the data body: ", body);
    let pkmn = new PokemonListItem;
    pkmn.id = body.id;
    pkmn.stringId = formatPkmnId(body.id);
    pkmn.name = capitalize(body.species.name);
    pkmn.species = body.species;
    pkmn.sprite = body.sprites.front_default;
    pkmn.height = body.height;
    pkmn.weight = body.weight;
    pkmn.types = body.types.map(tp => tp.type);
    pkmn.games = body.game_indices.map(game => game.version);
    pkmn.generations = calculateGenerations(pkmn.games);
    pkmn.baseStats = extractStats(body.stats);
    pkmn.moves = extractMoves(body.moves);

    console.log("This is the final extracted pkmn: ", pkmn);

    return pkmn;
  }

  getPokemonDescription(pkmnSpecies): Observable<string> {
    return this.http.get(pkmnSpecies.url).map(this.extractDescription);
  }

  extractDescription(res: Response) {
    let body = res.json();
    // flavor_text_entries is an array with many versions and languages. [1] is the description for the latest version in english
    const description = body.flavor_text_entries[1].flavor_text.replace(/\n/g, " ");
    return description;
  }


  // This returns before the API result. Need to rework to account for async response
  getMoveType(move): string {
    let moveType;
    let observable = this.http.get(move.url).map(this.extractMoveType);
    observable.subscribe(type => moveType = type);
    return moveType;
  }

  extractMoveType(res: Response) {
    let body = res.json();
    return body.type.name;
  }
}
