const fs = require('fs');

countChar = (string, checksum) => {
  const counts = {};
  string.split('').forEach(char => (
    counts[char] = counts[char] === undefined
      ? 1
      : counts[char] + 1
  ));

  const arr = [];
  for (let key in counts) {
    arr.push(`${counts[key]}-${key}`)
  }

  const arr2 = {};
  arr.sort().forEach(el => {
    const i = parseInt(el.split('-')[0], 10);
    if (!arr2[i]) {
      arr2[i] = [];
      arr2[i].push(el);
    } else {
      arr2[i].push(el);
    }
  });

  const final = [];
  for (let key in arr2) {
    arr2[key]
        .sort()
        .reverse()
        .forEach(el => final.push(el));
  }

  const sorted = final
      .reverse()
      .map(el => el.split('-')[1])
      .join('');

  return sorted.indexOf(checksum) === 0;
}

sumIds = input => {
  const rooms = input.split('\n');
  let sum = 0;

  rooms.forEach(room => {
    if (room === '') return;

    const roomName = room.split('-');
    const name = roomName.slice(0, roomName.length - 1).join('');
    const sectorId = parseInt(roomName[roomName.length - 1].split(/[\[\]]+/)[0], 10);
    const checksum = roomName[roomName.length - 1].split(/[\[\]]+/)[1];

    sum += countChar(name, checksum) ? sectorId : 0;
  });

  return sum;
}

console.log(sumIds(`
aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]
`)); // 1514

console.log(sumIds(`
bnknqetk-sno-rdbqds-idkkxadzm-knfhrshbr-521[kdnbr]
`)); // 521

fs.readFile('input2.txt', 'utf8', (err, input) => {
  console.log(sumIds(input));
}); // 18758

fs.readFile('input.txt', 'utf8', (err, input) => {
  console.log(sumIds(input));
});
