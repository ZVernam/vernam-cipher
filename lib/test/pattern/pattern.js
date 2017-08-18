import assert from 'assert';
import parse from '../../src/pattern/pattern';

const params = {
  site: {url: `google.com`},
  user: {token: `sometoken`}
};
const tests = [
  {
    pattern: `\${site.url}\${user.token}`,
    result: `${params.site.url}${params.user.token}`
  },
  {
    pattern: `just a string`,
    result: `just a string`
  },
  {
    pattern: `empty\${}pattern\${}doesn't count \${}`,
    result: `empty\${}pattern\${}doesn't count \${}`
  },
  {
    pattern: `some \${site.url} in middle`,
    result: `some ${params.site.url} in middle`
  }
];

describe(`Pattern should convert`, () => {
  for (const test of tests) {
    it(`should convert ${test.pattern} to ${test.result}`, () => {
      assert.equal(test.result, parse(test.pattern)(params));
    });
  }
});
