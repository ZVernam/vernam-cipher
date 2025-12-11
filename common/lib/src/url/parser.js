const WWW_PART = `www.`;
const URL_REGEXP = new RegExp([
  `^((http|mailto|chrome)s?:)//`, // protocol
  `(([^:/?#]*)(?::([0-9]+))?)`, // host (hostname and port)
  `(/{0,1}[^?#]*)`, // pathname
  `(\\?[^#]*|)`, // search
  `(#.*|)$` // hash
].join(``));


const parse = (url) => {
  const match = url.match(URL_REGEXP);
  return match && {
    protocol: match[2],
    host: match[3],
    hostname: match[4],
    port: match[5],
    pathname: match[6],
    search: match[7],
    hash: match[8]
  };
};

export default (url, excludeWWW = true) => {
  let domain = parse(url).hostname;

  if (excludeWWW) {
    const wwwIndex = domain.indexOf(WWW_PART);

    domain = wwwIndex >= 0 ?
      domain.substring(wwwIndex + WWW_PART.length, domain.length) : domain;
  }

  return domain;
};
