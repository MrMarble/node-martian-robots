#!/usr/bin/env node

const { Command } = require("commander");
const { version } = require("../lib/version");
const { init } = require("../lib/init");
const cli = new Command(`Martian Robots`);

cli
  .usage("[options]")
  .option("-v, --version", "output the version number", version)
  .option("-s, --source", "Input file")
  .option("-i, --interactive", "Run interactive console")
  .action(init)
  .parse(process.argv);
