const Hashes = require(`jshashes`);

class Converter {
  constructor(alphabet) {
    this.alphabet = alphabet;
  }

  find(char) {
    for (let i = 0; i < this.alphabet.length; i++) {
      if (char === this.alphabet[i]) {
        return i;
      }
    }
    return -1;
  }

  toChar(i) {
    // TODO: test and fix negative values
    return this.alphabet[i % this.alphabet.length];
  }
}

let converter = new Converter(require(`./cryptic`));

let xor = function (left, right) {
  return left ^ right;
};

/**
 * {
 *  reversible: boolean — makes algorithm reversible
 * }
 * @return {{encrypt: encrypt, decrypt: decrypt}}
 */
module.exports = function () {
  return {
    encrypt(text, secret) {
      // Failfast
      if (!text || !secret) {
        return ``;
      }

      let cipher = [];
      for (let i = 0; i < text.length; i++) {
        const result = xor(text.charCodeAt(i), secret.charCodeAt(i % secret.length));
        cipher.push(converter.toChar(result));
      }
      return cipher.join(``);
    },

    // TODO: are not reversible at the moment
    decrypt(cipher, secret) {
      if (!(cipher && secret)) {
        return ``;
      }

      let plain = [];
      for (let i = 0; i < cipher.length; i++) {
        const result = xor(converter.find(cipher[i]), converter.find(secret[i % secret.length]));
        plain.push(String.fromCharCode(result));
      }
      return plain;
    },

    /**
     * Hashes provided input by default with `SHA-256`, converts to `Base64`
     * and trims to source string length by default
     * @param {String} text — text to hash
     * @param {String} [algoName=`SHA256`] — hash algorithm name
     * @return {string}
     */
    hash(text, algoName = `SHA256`) {
      if (!text) {
        return text;
      }

      if (!Hashes[algoName]) {
        throw new Error(`Unknown algorithm name: ${algoName}`);
      }
      const hashFunction = new Hashes[algoName]();
      const base64 = hashFunction.b64(text);

      console.log(`Using hash-algorithm: ${algoName}`);
      console.log(`Hash Output raw: ${hashFunction.raw(text)}`);
      console.log(`Hash Output b64: ${base64}`);
      console.log(`Hash Output HEX: ${hashFunction.hex(text)}`);

      return base64;
    }
  };
};
