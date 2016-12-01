var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { capitalize, formatPkmnId } from '../helpers';
var PokemonListComponent = (function () {
    function PokemonListComponent() {
        this.selectPokemon = new EventEmitter();
        this.capitalize = capitalize;
        this.formatPkmnId = formatPkmnId;
    }
    PokemonListComponent.prototype.onSelect = function (pkmn) {
        this.selectedPkmnId = pkmn;
        this.selectPokemon.emit(pkmn);
    };
    return PokemonListComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], PokemonListComponent.prototype, "allPokemon", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], PokemonListComponent.prototype, "selectPokemon", void 0);
PokemonListComponent = __decorate([
    Component({
        selector: 'poke-list',
        templateUrl: './pokemon-list.html',
        styleUrls: ['pokemon-list.css'],
    }),
    __metadata("design:paramtypes", [])
], PokemonListComponent);
export { PokemonListComponent };
//# sourceMappingURL=../../../src/pokemon-list/pokemon-list.component.js.map