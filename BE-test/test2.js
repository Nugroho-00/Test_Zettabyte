/**
 * Direction:
 * Remove duplicated data from array
 * 
 * Expected Result:
 * [1, 2, 3, 4, 5]
 */
const data = [1, 4, 2, 3, 5, 3, 2, 4];

function result(data) {
  const tempData = {};
  const unique = [];

  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    if (!tempData[value]) {
      tempData[value] = true;
      unique.push(value);
    }
  }

  return unique.sort((a, b) => a - b);
}

console.log(result(data));
