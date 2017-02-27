import assert from 'assert';
import stripper from '../src/js/url/stripper';

const testUrls = [
    ['https://google.com', 'google.com'],
    ['http://apple.com/buy', 'apple.com'],
    ['http://www.apple.com/buy', 'apple.com'],
    ['http://maps.yandex.ru/buy', 'maps.yandex.ru'],
    ['http://apple.com/buy/something#hash', 'apple.com'],
    ['mailto://www.chicken.bricken.com/buy', 'chicken.bricken.com'],
    ['chrome://newtab/', 'newtab'],
    ['http://localhost:3000/', 'localhost'],
    ['https://duckduckgo.com/?q=sdfsdfsdf&atb=v13&ia=web', 'duckduckgo.com'],
];

describe('URI Stripper',  () => {
  for(const url of testUrls) {
    it(`should strip ${url[0]} to ${url[1]}`, () => {
      assert.equal(url[1], stripper(url[0]));
    })
  }
});