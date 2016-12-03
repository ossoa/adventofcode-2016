const fs = require('fs');

const GRID = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

getNumber = (initial, sequence) => {
  let {x, y} = initial;

  sequence.split('').forEach(char => {
    if (char === 'U') {
      x = x - 1 < 0 ? 0 : x - 1;
    } else if (char === 'D') {
      x = x + 1 > 2 ? 2 : x + 1;
    } else if (char === 'L') {
      y = y - 1 < 0 ? 0 : y - 1;
    } else if (char === 'R') {
      y = y + 1 > 2 ? 2: y + 1;
    }
  });

  return {
    x: x,
    y: y,
  };
};

getCode = (input) => {
  const initial = {x: 1, y: 1};
  const paths = input.split('\n');
  let lastPosition = initial;
  const code = [];

  paths.forEach((p, index) => {
    if (p === '') return;
    lastPosition = getNumber(lastPosition, p);
    code[index] = GRID[lastPosition.x][lastPosition.y];
  });

  return code.join('');
}

console.log(getCode(`ULL
RRDDD
LURDL
UUUUD`));

fs.readFile('input3.txt', 'utf8', (err, input) => {
  console.log(getCode(input));
});
