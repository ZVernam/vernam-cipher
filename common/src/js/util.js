import vernam from '../../lib/src/cipher/vernam';

export const shortHash = (text, hashAlgorithm) => {
  const fullHash = vernam.hash(text, hashAlgorithm);
  return fullHash.substring(0, text.length);
};

export const updateIcon = (button, iconName) => {
  const useElement = button.querySelector(`use`);
  const icon = `open-iconic.svg#${iconName}`;
  useElement.setAttribute(`xlink:href`, icon);
};
