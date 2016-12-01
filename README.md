# ngPokedex

ngPokedex is a SPA project I built in order to experiment with Angular after learning the React framework. The goal was to familiarize myself with the differences between the two and how to build and deploy an Angular app.

### A note on folder architecture and ng-cli
I set up the project following [Angular's QuickStart guide](https://angular.io/docs/ts/latest/quickstart.html), building on top of their Tour Of Heroes project. Only later would I find out about angular-cli, a neat little thing from the creators on Angular that extend commands like new and build to create and compile projects. Once I learned about it, I quickly installed it and migrated all my files to the new structure. Since much of this was copying/pasting, somethings might look weird from a project architecture perspective. Now you know why.

## Features
I wanted to keep the base project simple so I could get the handle of how things work in Angular before moving on to more complex tasks. Also, I wanted some nice interface, so I reserved a good chunk of time to research and implement a good  design.

Having said that:

| Feature | Status | Comment |
|--------------------------------------------|:-----------:|:-------------------:|
| App is built on Angular | DEPLOYED | |
| Pokemon information is fetched from PokeAPI | DEPLOYED | |
| List all Pokemon (name, number, sprite) | DEPLOYED | |
| Display details when Pokemon is selected | In Progress | |
| Display moves in details screen | | |
| Search bar | | |
| Type filter | | |
| Generation filter | | | |

## API
All data shown is fetched from a public API called [PokeAPI](pokeapi.co). Although it has a lot of data available, some of it is broken up and must be extracted correctly. Let's focus on what we want:m

### Name, ID, Sprite, Type, Games, Generation
All this data can be extracted fairly easily through the response's body

## Components
There are two main components which are rendered through the main `app.component`:

| Components | Rendered On |
|-|:-|
| PokemonListComponent | `<pokemon-list>` |
| PokemonDetailComponent | `<pokemon-detail>` |

Each component has its own html template file.

### ApplicationComponent
The main app.component nests the subcomponents mentioned above and is responsible for triggering all API calls from the flow. When the components initializes, it makes the first API call of the flow, getting a list of all Pokemon. This is done through the `ngOnInit()` lifecycle method. That call subscribes to (triggers) an Observable, which is responsible for making the API GET request:

```javascript
ngOnInit(): void {
  this.getAllPokemon();
}

getAllPokemon(): void {
  //When we subscribe, the Observable service runs
  this.pokemonServices.getAllPokemon().subscribe( pkmns => this.allPokemon = pkmns );
}
```
`this.allPokemon` is then sent to the corresponding `PokemonListComponent` where the data gets rendered as a list. From there, whenever a user clicks on a Pokemon, `app.component` receives the ID of the clicked Pokemon and triggers the API call to fetch that Pokemon's information:

```javascript
selectPokemon(pkmn: number):void {
  this.selectedPkmn = null;
  this.fetchingStatus = 'Pokemon';

  this.pokemonServices.getOnePokemonV2(pkmn).subscribe( pokemon => {
    this.selectedPkmn = pokemon;
    this.fetchingStatus = 'description';

    const pkmnSpecies = pokemon.species;
    this.pokemonServices.getPokemonDescription(pkmnSpecies)
      .subscribe( description => {
        this.selectedPkmn.description = description;
        this.fetchingStatus = null;
    });
  })
}
```

A few things are worth noticing:
* `this.selectedPkmn` is set to `null`. This is done so whatever Pokemon detail is being displayed is removed from the screen while the API call processes.
* When the API returns, it doesn't actually return the Pokemon description. That information is fetched through a subsequent API call to the returned Pokemon's species.
* `this.fetchingStatus` is used to determine the loading spinner's status.

### PokemonListComponent
