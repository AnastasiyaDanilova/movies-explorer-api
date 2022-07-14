const { crashTestErrorText } = require('../utils/constants');

module.exports = () => {
  setTimeout(() => {
    throw new Error(crashTestErrorText);
  }, 0);
};
