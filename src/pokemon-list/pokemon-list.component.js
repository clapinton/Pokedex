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
const helpers_1 = require('../helpers');
let PokemonListComponent = class PokemonListComponent {
    constructor() {
        this.selectPokemon = new core_1.EventEmitter();
        // Making the helper functions available to the template
        this.capitalize = helpers_1.capitalize;
        this.formatPkmnId = helpers_1.formatPkmnId;
    }
    onSelect(pkmn) {
        this.selectedPkmnId = pkmn; //Used to toggle class when selectedPkmn is the same as the pokemon item
        this.selectPokemon.emit(pkmn); //Outputs to app.component so it can trigger the getOnePkmn API call
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Array)
], PokemonListComponent.prototype, "allPokemon", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], PokemonListComponent.prototype, "selectPokemon", void 0);
PokemonListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'poke-list',
        templateUrl: 'pokemon-list.html',
        styleUrls: ['pokemon-list.css'],
    }), 
    __metadata('design:paramtypes', [])
], PokemonListComponent);
exports.PokemonListComponent = PokemonListComponent;
//# sourceMappingURL=pokemon-list.component.js.map