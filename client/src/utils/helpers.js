/* For small common helper utility functions */

export const titleCase = (str) => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const findIndexInObjArray = (myArray, searchTerm, property) => {
  for (var i = 0, len = myArray.length; i < len; i++) {
    if (myArray[i][property] === searchTerm) return i;
  }
  return -1;
};

export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}

export const getRandomNumber = (start, end) => {
  return Math.floor(Math.random() * end) + start;
};

export function capitalizeFirstLetter(word) {
  if (typeof word !== "string") return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function sortArrOfObjects(arr, param, type) {
  if (type === "desc")
    return arr.sort((a, b) => (a[param] > b[param] ? -1 : b[param] > a[param] ? 1 : 0));
  else if (type === "asc")
    return arr.sort((a, b) => (a[param] > b[param] ? 1 : b[param] > a[param] ? -1 : 0));
}

export function arrayRandomShuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function splitArrChunks(arr, noOfChunks) {
  if (!arr || !noOfChunks) throw new Error("Params missing");

  return arr.reduce((accum, curr, index, array) => {
    if (index % noOfChunks === 0) accum.push(array.slice(index, index + noOfChunks));
    return accum;
  }, []);
}

export function convertArrToObj(arr, key) {
  const obj = {};
  arr.forEach((item) => {
    obj[item[key]] = item;
  });
  return obj;
}
