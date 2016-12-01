//Assembles all components

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ], //list of external modules used by application
  declarations: [ AppComponent, PokemonDetailComponent, PokemonListComponent ], //list of all components, pipes, and directives that we created and that belong in our application's module
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
