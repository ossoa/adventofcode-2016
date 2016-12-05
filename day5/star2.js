const crypto = require('crypto');

decrypt = string => {
  let pass = [,,,,,,,];
  let index = 1;
  let foundCount = 0;

  while (foundCount < 8) {
    const hash = crypto
        .createHash('md5')
        .update(string + '' + index)
        .digest('hex');

    if (hash.indexOf('00000') === 0) {
      if (hash[5] >= 0 && hash[5] <= 7 &&
          pass[hash[5]] === undefined) {
        pass[hash[5]] = hash[6];
        foundCount++;
      }
    }
    index += 1;
  }

  return pass.join('');
}

console.log(decrypt('abc')); // 05ace8e3

console.log(decrypt('ffykfhsq'));
