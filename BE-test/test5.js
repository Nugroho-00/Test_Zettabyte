/**
 * Direction:
 * Find prefix of the word from array of string
 *
 * Expected Result:
 * fl
 */
const words = ["flower", "flow", "flight"];

function result(words) {
  if (words.length) return "";

  let setPrefix = words[0];

  for (let i = 1; i < words.length; i++) {
    while (words[i].indexOf(setPrefix) !== 0) {
      setPrefix = setPrefix.slice(0, -1);
      if (!setPrefix) return "";
    }
  }
  return setPrefix;
}

console.log(result(words));
