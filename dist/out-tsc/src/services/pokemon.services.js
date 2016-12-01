var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { extractAllPokemon, extractOnePokemon, extractDescription, extractMoveType } from './extractors';
import 'rxjs/add/operator/map';
var PokemonService = (function () {
    function PokemonService(http) {
        this.http = http;
        this.baseUrlV1 = 'https://pokeapi.co/api/v1';
        this.baseUrlV2 = 'https://pokeapi.co/api/v2';
    }
    ;
    PokemonService.prototype.getAllPokemon = function () {
        var allPokemonUrl = this.baseUrlV2 + "/pokedex/1";
        return this.http.get(allPokemonUrl).map(extractAllPokemon);
    };
    PokemonService.prototype.getOnePokemonV2 = function (pkmn) {
        var onePokemonUrl = this.baseUrlV2 + "/pokemon/" + pkmn;
        return this.http.get(onePokemonUrl).map(extractOnePokemon);
    };
    PokemonService.prototype.getPokemonDescription = function (pkmnSpecies) {
        return this.http.get(pkmnSpecies.url).map(extractDescription);
    };
    PokemonService.prototype.getMoveType = function (move) {
        var moveType;
        var observable = this.http.get(move.url).map(extractMoveType);
        observable.subscribe(function (type) { return moveType = type; });
        return moveType;
    };
    return PokemonService;
}());
PokemonService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], PokemonService);
export { PokemonService };
//# sourceMappingURL=../../../../src/services/pokemon.services.js.map