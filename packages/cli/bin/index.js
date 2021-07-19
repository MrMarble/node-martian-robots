#!/usr/bin/env node

const { Command } = require("commander");
const { version } = require("../lib/version");
const { init } = require("../lib/init");
const { error } = require("../lib/error");

const cli = new Command(`Martian Robots`);

const main = async () => {
  try {
    cli
      .usage("[options]")
      .option("-v, --version", "output the version number", version)
      .option("-s, --source <file>", "Input file")
      .option("-o, --output <file>", "Output file. Defaults to stdout")
      .option("-i, --interactive", "Run interactive console")
      .action(init);

    await cli.parseAsync(process.argv);
  } catch (e) {
    error(e.message);
  }
};

main();
