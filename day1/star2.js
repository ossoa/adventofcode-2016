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

  let allSteps = {
    '0,0': true,
  }

  let currentDirection = 'N';
  let endPoint = [0, 0];

  steps.every(step => {
    const turn = step[0];
    const numberOfBlocks = parseInt(step.split('').slice(1).join(''), 10);
    const goTo = getNextDirection(currentDirection, turn);

    let change = 1;
    let coordinate = 0;

    if (goTo == 'N') {
      change = 1;
      coordinate = 1;
    }

    if (goTo == 'S') {
      change = -1;
      coordinate = 1;
    }

    if (goTo == 'E') {
      change = 1;
      coordinate = 0;
    }

    if (goTo == 'W') {
      change = -1;
      coordinate = 0;
    }

    for (let i = 0 ;  i < numberOfBlocks ; i++) {
      endPoint[coordinate] += change;

      if (allSteps[`${endPoint[0]},${endPoint[1]}`] === true) {
        return false;
      }

      allSteps[`${endPoint[0]},${endPoint[1]}`] = true;
    }

    currentDirection = goTo;
    return true;
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
