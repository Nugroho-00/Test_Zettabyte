/**
 * Direction:
 * Find missing number from the list
 *
 * Expected Result:
 * 8
 */
const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

function result(numbers) {
  const num = numbers.length;
  const expectedResult = (num * (num + 1)) / 2;
  const actualResult = numbers.reduce((a, b) => a + b, 0);
  return expectedResult - actualResult;
}

console.log(result(numbers));
