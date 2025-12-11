import assert from 'assert';
import {shortHash} from '../src/js/util.js';

describe(`shortHash`, function () {
  it(`should return string with length of first argument`, function () {
    const algoName = `SHA256`;
    const text = `four`;
    const result = shortHash(text, algoName);

    assert.equal(`string`, typeof result);
    assert.equal(4, result.length);
  });
})