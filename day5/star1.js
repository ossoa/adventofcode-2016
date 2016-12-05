const crypto = require('crypto');

decrypt = string => {
  let pass = '';
  let index = 1;

  while (pass.length < 8) {
    const hash = crypto
        .createHash('md5')
        .update(string + '' + index)
        .digest('hex');

    if (hash.indexOf('00000') === 0) {
      pass += hash[5];
    }

    index += 1;
  }

  return pass;
}

console.log(decrypt('abc')); // 18f47a30

console.log(decrypt('ffykfhsq'));
