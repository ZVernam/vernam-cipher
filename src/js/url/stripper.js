const WWW_PART = `www`;

const parse = (url) => {
  if (typeof document !== `undefined`) {
    const parser = document.createElement(`a`);
    parser.href = url;
    return parser;
  } else {
    const reURLInformation = new RegExp([
      `^((http|mailto|chrome)s?:)//`, // protocol
      `(([^:/?#]*)(?::([0-9]+))?)`, // host (hostname and port)
      `(/{0,1}[^?#]*)`, // pathname
      `(\\?[^#]*|)`, // search
      `(#.*|)$` // hash
    ].join(``));
    const match = url.match(reURLInformation);
    return match && {
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7]
    };
  }
};

export default (url, excludeWWW = true) => {
  let domain = parse(url).hostname;

  if (excludeWWW) {
    const wwwIndex = domain.indexOf(WWW_PART);
    domain = domain.substring(wwwIndex + WWW_PART.length, domain.length);
  }

  return domain;
};
