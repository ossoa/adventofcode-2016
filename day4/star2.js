const fs = require('fs');

decrypt = input => {
  const rooms = input.split('\n');
  let id = 0;

  rooms.forEach(room => {
    if (room === '') return;

    const roomName = room.split('-');
    const sectorId = parseInt(roomName[roomName.length - 1].split(/[\[\]]+/)[0], 10);

    let name = roomName.slice(0, roomName.length - 1).join(' ');

    for (let i = 0 ; i < sectorId ; i++) {
      let newName = '';

      name.split('').forEach(char => {
        const code = char.charCodeAt();
        const newChar =
            char === ' '
            ? ' '
            : (char === 'z' ? 'a' : String.fromCharCode(code + 1));

        newName += newChar;
      });

      name = newName;
    }

    if (name === 'northpole object storage') {
      id = sectorId;
    }
  });

  return id;
}

console.log(decrypt(`
qzmt-zixmtkozy-ivhz-343
`)); // very encrypted name

fs.readFile('input.txt', 'utf8', (err, input) => {
  console.log(decrypt(input));
});
