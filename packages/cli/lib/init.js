const init = (options) => {
  if (options.interactive) {
    return;
  }

  if (!options.source) {
    console.error("Source file is required.");
  }
};

module.exports = {
  init,
};
