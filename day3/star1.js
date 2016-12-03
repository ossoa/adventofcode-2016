const fs = require('fs');

extractTriangle = input => (
  input
    .split(' ')
    .filter(el => (el !== ''))
    .map(el => (parseInt(el, 10)))
);

isTriangle = sides => (
  sides[0] + sides[1] > sides[2] &&
    sides[0] + sides[2] > sides[1] &&
    sides[1] + sides[2] > sides[0]
)

let possibleTriangles = 0;
countTriangles = input => {
  const triangles = input.split('\n');

  triangles.forEach(triangle => {
    if (triangle === '') return;

    if (isTriangle(extractTriangle(triangle))) {
      possibleTriangles++;
    }
  });

  return possibleTriangles;
}

fs.readFile('input.txt', 'utf8', (err, input) => {
  console.log(`There are ${countTriangles(input)} triangles.`);
});
