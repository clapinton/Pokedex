export const capitalize = str => str.replace(/\b\w/g, l => l.toUpperCase());

export const removeDash = str => str.replace(/-/g, " ");

export const removeDashCapitalize = str => capitalize(removeDash(str)) ;

export const formatPkmnId = pkmnId => {
  return ("00" + pkmnId).slice(-3);
}

export const calculatePercent = (max, num) => {
  return Math.floor((num / max) * 100);
}
