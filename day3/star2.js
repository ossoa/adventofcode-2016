const fs = require('fs');

extractTriangles = input => {
  const all = input
      .split(' ')
      .filter(el => (el !== ''))
      .map(el => (parseInt(el, 10)));

  const grouped = [];
  for (let i = 0; i < all.length ; i += 9) {
    grouped.push(all.slice(i, i+9));
  }

  const final = [];
  grouped.forEach(line => {
    final.push([line[0], line[3], line[6]]);
    final.push([line[1], line[4], line[7]]);
    final.push([line[2], line[5], line[8]]);
  });

  return final;
}

isTriangle = sides => (
  sides[0] + sides[1] > sides[2] &&
    sides[0] + sides[2] > sides[1] &&
    sides[1] + sides[2] > sides[0]
)

let possibleTriangles = 0;
countTriangles = input => {
  const triangles = extractTriangles(input);

  triangles.forEach(triangle => {
    if (triangle === '') return;

    if (isTriangle(triangle)) {
      possibleTriangles++;
    }
  });

  return possibleTriangles;
}

fs.readFile('input.txt', 'utf8', (err, input) => {
  console.log(`There are ${countTriangles(input)} triangles.`);
});
