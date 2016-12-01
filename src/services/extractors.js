"use strict";
const pokemon_1 = require('../pokemon');
const helpers_1 = require('../helpers');
const poke_constants_1 = require('../poke-constants');
exports.extractAllPokemon = res => {
    let body = res.json();
    return body.pokemon_entries || {};
};
exports.extractStats = stats => {
    let allStats = [];
    stats.forEach((st, idx) => {
        let newStat = new pokemon_1.BaseStat();
        newStat['stat'] = helpers_1.removeDashCapitalize(st.stat.name);
        let biggestStat = poke_constants_1.BIGGEST_BASE_STATS[st.stat.name];
        newStat['base_stat'] = st.base_stat;
        newStat['percent'] = helpers_1.calculatePercent(biggestStat, st.base_stat);
        allStats.push(newStat);
    });
    // Calculates total stats
    let totalStat = new pokemon_1.BaseStat();
    totalStat['stat'] = "Total";
    totalStat['base_stat'] =
        allStats.reduce((sum, stat) => sum += stat.base_stat, 0);
    let biggestStat = poke_constants_1.BIGGEST_BASE_STATS['total'];
    totalStat['percent'] = helpers_1.calculatePercent(biggestStat, totalStat['base_stat']);
    allStats.push(totalStat);
    console.log("This is the extracted allStats: ", allStats);
    return allStats;
};
exports.extractMoves = moves => {
    let allMoves = [];
    moves.forEach((mv, idx) => {
        let eachMove = new pokemon_1.Move();
        eachMove.name = mv.move.name;
        // Need to change the getType function to account for the async run
        // eachMove.type = this.getMoveType(mv.move);
        eachMove.learnBy = mv.version_group_details[0].move_learn_method.name;
        eachMove.levelLearned = 0;
        if (eachMove.learnBy === "level-up") {
            eachMove.levelLearned = mv.version_group_details[0].level_learned_at;
        }
        allMoves[idx] = eachMove;
    });
    console.log("This is the extracted allMoves: ", allMoves);
    return allMoves;
};
exports.extractOnePokemon = res => {
    const calculateGenerations = games => {
        let gens = [];
        games.forEach(game => {
            // debugger
            let gen = poke_constants_1.GAMES_GENERATIONS[game.name];
            if (!gens.find(g => g.name === gen.name))
                gens.push(gen);
        });
        return gens.reverse();
    };
    let body = res.json();
    console.log("this is the data body: ", body);
    let pkmn = new pokemon_1.PokemonListItem;
    pkmn.id = body.id;
    pkmn.stringId = helpers_1.formatPkmnId(body.id);
    pkmn.name = helpers_1.capitalize(body.species.name);
    pkmn.species = body.species;
    pkmn.sprite = body.sprites.front_default;
    pkmn.height = body.height;
    pkmn.weight = body.weight;
    pkmn.types = body.types.map(tp => tp.type);
    pkmn.games = body.game_indices.map(game => game.version);
    pkmn.generations = calculateGenerations(pkmn.games);
    pkmn.baseStats = exports.extractStats(body.stats);
    pkmn.moves = exports.extractMoves(body.moves);
    console.log("This is the final extracted pkmn: ", pkmn);
    return pkmn;
};
exports.extractDescription = res => {
    let body = res.json();
    // flavor_text_entries is an array with many versions and languages. [1] is the description for the latest version in english
    const description = body.flavor_text_entries[1].flavor_text.replace(/\n/g, " ");
    return description;
};
exports.extractMoveType = res => {
    let body = res.json();
    return body.type.name;
};
//# sourceMappingURL=extractors.js.map