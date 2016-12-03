const fs = require('fs');

getNextDirection = (currentDirection, turn) => {
  const directions = ['N', 'E', 'S', 'W'];
  const currentDirectionIndex = directions.indexOf(currentDirection);
  let nextDirection;

  if (turn === 'R') {
    nextDirection = directions[
      currentDirectionIndex === directions.length - 1
      ? 0
      : currentDirectionIndex + 1
    ];
  }

  if (turn === 'L') {
    nextDirection = directions[
      currentDirectionIndex === 0
      ? directions.length - 1
      : currentDirectionIndex - 1];
  }

  return nextDirection;
}

findEndPoint = (path) => {
  const steps = path.split(', ');
  const directions = ['N', 'E', 'S', 'W'];

  let currentDirection = 'N';
  let endPoint = [0, 0];

  steps.forEach(step => {
    const turn = step[0];
    const numberOfBlocks = parseInt(step.split('').slice(1).join(''), 10);
    const goTo = getNextDirection(currentDirection, turn);

    if (goTo == 'N') {
      endPoint[1] += numberOfBlocks;
    }

    if (goTo == 'S') {
      endPoint[1] -= numberOfBlocks;
    }

    if (goTo == 'E') {
      endPoint[0] += numberOfBlocks;
    }

    if (goTo == 'W') {
      endPoint[0] -= numberOfBlocks;
    }

    currentDirection = goTo;
  });

  return Math.abs(endPoint[0]) + Math.abs(endPoint[1]);
}

console.log('#', findEndPoint('R2, L3')); // 5
//   0, 0
//R2 2, 0
//L3 2, 3

console.log('##', findEndPoint('R2, R2, R2')); // 2
//   0, 0
//R2 2, 0
//R2 2, -2
//R2 0, -2


console.log('###', findEndPoint('R5, L5, R5, R3')); // 12
//   0, 0
//R5 5, 0
//L5 5, 5
//R5 10, 5
//R3 10, 2

fs.readFile('input.txt', 'utf8', (err, input) => {
  console.log(findEndPoint(input));
});
