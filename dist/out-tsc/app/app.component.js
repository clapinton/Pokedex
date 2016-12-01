var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.services';
var AppComponent = (function () {
    function AppComponent(pokemonServices) {
        this.pokemonServices = pokemonServices;
        this.fetchingStatus = null;
    }
    ;
    AppComponent.prototype.ngOnInit = function () {
        this.getAllPokemon();
    };
    AppComponent.prototype.getAllPokemon = function () {
        var _this = this;
        this.pokemonServices.getAllPokemon().subscribe(function (pkmns) { return _this.allPokemon = pkmns; });
    };
    AppComponent.prototype.selectPokemon = function (pkmn) {
        var _this = this;
        this.selectedPkmn = null;
        this.fetchingStatus = 'Pokemon';
        this.pokemonServices.getOnePokemonV2(pkmn).subscribe(function (pokemon) {
            _this.selectedPkmn = pokemon;
            _this.fetchingStatus = 'description';
            var pkmnSpecies = pokemon.species;
            _this.pokemonServices.getPokemonDescription(pkmnSpecies)
                .subscribe(function (description) {
                _this.selectedPkmn.description = description;
                _this.fetchingStatus = null;
            });
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        selector: 'pokedex-app',
        providers: [PokemonService],
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [PokemonService])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=../../../src/app/app.component.js.map