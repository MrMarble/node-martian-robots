const package = require("../package.json");

const version = () => console.log(package.version);

module.exports = { version };
