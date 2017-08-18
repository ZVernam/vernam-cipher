const PATTERN_BEGIN = `\${`;
const PATTERN_END = `}`;
const OBJECT_DELIMITER = `.`;

const readValue = (value) => {
  const paths = value.split(OBJECT_DELIMITER);
  return (param) => {
    let result = param;
    for (const path of paths) {
      result = result[path];
    }
    return result;
  };
};

const parse = (pattern) => {
  const tokens = pattern.split(PATTERN_BEGIN);
  const strings = [];
  const values = [];
  if (tokens.length > 1) {
    for (const token of tokens) {
      const end = token.indexOf(PATTERN_END);
      if (end > 0) {
        values.push(readValue(token.substring(0, end)));
      } else if (end === 0) {
        strings.push(PATTERN_BEGIN);
      }
      strings.push(token.substring(end > 0 ? end + PATTERN_END.length : 0, token.length));
    }
  } else {
    strings.push(tokens[0]);
  }
  return (param) => {
    const result = [];
    for (let i = 0; i < strings.length; i++) {
      const string = strings[i];
      result.push(string);
      const value = values[i];
      if (value) {
        result.push(value(param));
      }
    }
    return result.join(``);
  };
};
export default parse;
