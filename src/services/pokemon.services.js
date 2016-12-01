"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
const extractors_1 = require('./extractors');
require('rxjs/add/operator/map');
let PokemonService = class PokemonService {
    constructor(http) {
        this.http = http;
        this.baseUrlV1 = 'http://pokeapi.co/api/v1';
        this.baseUrlV2 = 'http://pokeapi.co/api/v2';
    }
    ;
    getAllPokemon() {
        //This is a cold Observable. It needs a subscriber in order to execute
        const allPokemonUrl = `${this.baseUrlV2}/pokedex/1`;
        return this.http.get(allPokemonUrl).map(extractors_1.extractAllPokemon);
    }
    // getOnePokemonV1(pkmn): Observable<PokemonListItem> {
    //   console.log("pokemon is", pkmn)
    //   const pkmnUrl = `${this.baseUrlV1}/pokemon/${pkmn}`;
    //   return this.http.get(pkmnUrl).map(this.extractOnePokemon);
    // }
    getOnePokemonV2(pkmn) {
        const onePokemonUrl = `${this.baseUrlV2}/pokemon/${pkmn}`;
        return this.http.get(onePokemonUrl).map(extractors_1.extractOnePokemon);
    }
    getPokemonDescription(pkmnSpecies) {
        return this.http.get(pkmnSpecies.url).map(extractors_1.extractDescription);
    }
    // This returns before the API result. Need to rework to account for async response
    getMoveType(move) {
        let moveType;
        let observable = this.http.get(move.url).map(extractors_1.extractMoveType);
        observable.subscribe(type => moveType = type);
        return moveType;
    }
};
PokemonService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], PokemonService);
exports.PokemonService = PokemonService;
//# sourceMappingURL=pokemon.services.js.map