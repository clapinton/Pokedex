export const capitalize = str => str.replace(/\b\w/g, l => l.toUpperCase());

export const removeDash = str => str.replace(/-/g, " ");

export const removeDashCapitalize = str => capitalize(removeDash(str)) ;

export const formatPkmnId = pkmnId => {
  return ("00" + pkmnId).slice(-3);
}

export const calculatePercent = (max, num) => {
  return Math.floor((num / max) * 100);
}

export const searchByNumber = (allPkmn, searchTerm) => { 
  searchTerm -= 1;
  if (allPkmn[searchTerm]) {
    return [allPkmn[searchTerm]];
  } else {
    return []
  }  
  
}

export const searchByName = (allPkmn, searchTerm) => {
  let results = [];
  const searchRegExp = new RegExp(searchTerm.toLowerCase());

  allPkmn.forEach( pkmn => {
    let name = pkmn.pokemon_species.name;
    if (searchRegExp.exec(name)) results.push(pkmn);
  });

  return results;
  
}
