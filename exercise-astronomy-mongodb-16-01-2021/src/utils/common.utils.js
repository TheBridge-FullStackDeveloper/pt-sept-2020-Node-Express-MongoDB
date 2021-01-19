const capitalize = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);

const camelize = (str) =>
  str
    .split(/[$-/:-?{-~!"^_`\[\]]/)
    .map((word, index) => (index > 0 ? capitalize(word) : word))
    .join('');

module.exports = {
  capitalize,
  camelize,
};
