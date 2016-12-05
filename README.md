# ngPokedex

[Gotta know'em all!](https://clapinton.github.io/angular-pokedex/)

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
All data shown is fetched from a public API called [PokeAPI](pokeapi.co). Although it has a lot of data available, some of it is broken up and must be extracted correctly. Let's focus on what we want:

### ID, Sprite, Type, Games, Generation
All this data can be extracted fairly easy through the response's body. Generation need some logic around it so we can have the corresponding game generation from the Game itself.

### Name
Even though we get a `name` property on the body of the response, that name is often times formatted in some particular way, sometimes with dashes, sometimes with comments, and even with "mega" forms appended to it. Since we only want the name, that can be extracted from the `species` property.

### Base Stats
This information comes from the property `base_stats`, but  is then treated so we get the name, value and percentage according to the Pokemon with the highest stat. The percentage will later be used when rendering the stats bars.

### Other data
There's plenty of other information on the response body, such as Moves. They will be incorporated at a later time.

### Follow Up Calls
In order to get information on games' generations, as well as base stats, it is possible to issue API calls to the corresponding URL, but that would mean extra loading time. Since I wanted to reduce that time, and considering that the information can be easily calculated on the client side, I opted for performing those types of extractions manually. For example: to get the game's generation:

```javascript
export const GAMES_GENERATIONS: Object = {
  'red': {name: 'gen-rby', fullName: 'Red • Blue • Yellow', number: 1},
  'green': {name: 'gen-rby', fullName: 'Red • Blue • Yellow', number: 1},
  'blue': {name: 'gen-rby', fullName: 'Red • Blue • Yellow', number: 1},
  'yellow': {name: 'gen-rby', fullName: 'Red • Blue • Yellow', number: 1},
  'gold': {name: 'gen-gsc', fullName: 'Gold • Silver • Crystal', number: 2},
  'silver': {name: 'gen-gsc', fullName: 'Gold • Silver • Crystal', number: 2},
  'crystal': {name: 'gen-gsc', fullName: 'Gold • Silver • Crystal', number: 2},
  // etc for other gens
const calculateGenerations = games => {
  let gens = [];
  games.forEach(game => {
    let gen = GAMES_GENERATIONS[game.name];
    if (!gens.find( g => g.name === gen.name)) gens.push(gen);
  })
  return gens.reverse();
}
```

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
The `PokemonListComponent` has two main variables, which are decorated accordingly:

```javascript
@Input() allPokemon: PokemonListItem[];
@Output() selectPokemon = new EventEmitter<PokemonListItem>();
```

On the HTML side, there's a loop that goes through `allPokemon`, printing one by one:
```html
<li class="box box-white stripes"
*ngFor="let pkmn of allPokemon"
(click)="onSelect(pkmn.entry_number)"
[class.poke-selected]="pkmn.entry_number === selectedPkmnId">
...
</li>
```

The `[class.poke-selected]="pkmn.entry_number === selectedPkmnId"` is responsible for toggling the `.poke-selected` class to whatever Pokemon is clicked on. From there, we can change how a clicked item is stylized.

### PokemonDetailComponent
The `pokemon-detail.component` is more of a render component than the `pokemon-list.component`. All the data that is passed has already been prepared following the API response.

On the html side, we render the spinner icon while the fetchingStatus, defined previously in `app.component` has some value. The Pokemon content itself only gets loaded after the description API response arrives:

```html
<div *ngIf="fetchingStatus" class="loading">
  <img src="/assets/images/pikachu-waiting.gif"/>
  <p>Fetching {{fetchingStatus}}</p>
</div>


<div *ngIf="pkmn && pkmn.description" class="pokemon-detail">
...
</div>
```

## Helper Files
Three main helper files were added:

* **extractor.ts:** contains various functions to extract the correct data from the API responses;
* **helpers.ts:** helper functions to format string, calculate percentages, format numbers etc;
* **poke-constants.ts**: to avoid extra API calls, some constants were defined so more relevant information could be extracted.
