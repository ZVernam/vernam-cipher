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
      protocol: match[2],
      host: match[3],
      hostname: match[4],
      port: match[5],
      pathname: match[6],
      search: match[7],
      hash: match[8]
    };
  }
};

export default (url, excludeWWW = true) => {
  let domain = parse(url).hostname;

  if (excludeWWW) {
    const wwwIndex = domain.indexOf(WWW_PART);

    domain = wwwIndex >= 0 ?
        domain.substring(wwwIndex + WWW_PART.length + 1, domain.length) : domain;
  }

  return domain;
};
