import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../pokemon';


@Component ({
  selector: 'pokemon-detail',
  template: `
  <div *ngIf="pkmn">
    <h2>{{pkmn.name}} details!</h2>
    <div>
      <label>id: </label>{{pkmn.id}}
    </div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="pkmn.name" placeholder="name"/>
    </div>
  </div>`,
})

export class PokemonDetailComponent {
  //Notation to clarify that hero is an input to the component
  @Input()
  pkmn: PokemonListItem;
};
