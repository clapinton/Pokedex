var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../pokemon';
var PokemonDetailComponent = (function () {
    function PokemonDetailComponent() {
    }
    PokemonDetailComponent.prototype.formatPkmnId = function (pkmnId) {
        return ("00" + pkmnId).slice(-3);
    };
    return PokemonDetailComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", PokemonListItem)
], PokemonDetailComponent.prototype, "pkmn", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], PokemonDetailComponent.prototype, "fetchingStatus", void 0);
PokemonDetailComponent = __decorate([
    Component({
        selector: 'pokemon-detail',
        templateUrl: 'pokemon-detail.html',
        styleUrls: ['pokemon-detail.css'],
    }),
    __metadata("design:paramtypes", [])
], PokemonDetailComponent);
export { PokemonDetailComponent };
//# sourceMappingURL=../../../src/pokemon-detail/pokemon-detail.component.js.map