# Angular Pokedex

## Project Scope
The sole purpose of this project is to learn Angular by using it to build a functioning app. Since I built a similar project in the past while learning React/Redux, this seems like an interesting app to bring it into the Angular framework.

### MVP
The MVP features for this project will be different than those from the React version as follows:
* The whole app will be built on top of Angular's framework;
* Fetch Pokemon data from a RESTful API source named [Pokeapi](https://pokeapi.co/);
* List all existing Pokemon, with number, name and sprites;
* When selecting a specific Pokemon from the list, its details are displayed.
* Production README

### Bonus
When all MVP are deployed, start working on these:
* Search with dynamic filtering;
* Type and generation filtering;
* Google Maps API with Pokemon area map to display where Pokemon is encountered


## Wireframes
The app will be a single-page app, with the list, filters and search bar on the left and the main screen on the right:

![Pokedex Wireframe](./images/wireframe.png)

## Technologies
The app will be built on top of:
* Angular.js;
* HTML5 and CSS3/SCSS for markup and styling;
* RESTful API, returning JSON-formatted data;

The app's file structure will be determined according to Angular's architecture.

### PokeAPI
The following data will be extracted from the API, among the many data points returned:

Example request: GET http://pokeapi.co/api/v2/pokemon/1

Example repsonse:
```javascript
id: 1,
name: "bulbasaur",
stats: [...],
types: [...],
weight: 69,
moves: [...],
sprites: {...},
location_area_encounters: "", //bonus
```

Since the response can reach 9000+ lines, it might make sense to serve the id, name and sprite of all Pokemon from the app itself, instead of the API response, for the index list, since making calls for all 700+ Pokemon, each returning 9000+ lines, when the app is first launched is likely to result in a huge amount of data transfer, which is undesirable.

## Timeline
**Day 1 and 2:**
Study Angular and build the skeleton files for the app;

**Day 3:**
Render the PokeIndex component;

**Day 4:**
Render the PokeDetails and MovesList components

**Day 5:**
Styling and polishing
