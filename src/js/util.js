import vernam from '../../lib/src/cipher/vernam';

export const shortHash = (text, hashAlgorithm) => {
  const fullHash = vernam.hash(text, hashAlgorithm);
  return fullHash.substring(0, text.length);
};
