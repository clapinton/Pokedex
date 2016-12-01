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
const pokemon_1 = require('../pokemon');
let PokemonDetailComponent = class PokemonDetailComponent {
    formatPkmnId(pkmnId) {
        return ("00" + pkmnId).slice(-3);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', pokemon_1.PokemonListItem)
], PokemonDetailComponent.prototype, "pkmn", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], PokemonDetailComponent.prototype, "fetchingStatus", void 0);
PokemonDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'pokemon-detail',
        templateUrl: `pokemon-detail.html`,
        styleUrls: ['pokemon-detail.css'],
    }), 
    __metadata('design:paramtypes', [])
], PokemonDetailComponent);
exports.PokemonDetailComponent = PokemonDetailComponent;
;
//# sourceMappingURL=pokemon-detail.component.js.map