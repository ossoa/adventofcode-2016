const fs = require('fs');

const GRID = [
  [null, null, 1, null, null],
  [null, 2, 3, 4, null],
  [5, 6, 7, 8, 9],
  [null, 'A', 'B', 'C', null],
  [null, null, 'D', null, null],
];

getNumber = (initial, sequence) => {
  let {x, y} = initial;


  sequence.split('').forEach(char => {
    if (char === 'U') {
      x = x - 1 < 0
        ? x
        : (GRID[x - 1][y] === null ? x : x - 1);
    } else if (char === 'D') {
      x = x + 1 > GRID.length - 1
        ? x
        : (GRID[x + 1][y] === null ? x : x + 1);
    } else if (char === 'L') {
      y = y - 1 < 0
        ? y
        : (GRID[x][y - 1] === null ? y : y - 1);
    } else if (char === 'R') {
      y = y + 1 > GRID.length - 1
        ? y
        : (GRID[x][y + 1] === null ? y : y + 1);
    }
  });

  return {
    x: x,
    y: y,
  };
};

getCode = (input) => {
  const initial = {x: 2, y: 0};
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

fs.readFile('input.txt', 'utf8', (err, input) => {
  console.log(getCode(input));
});
