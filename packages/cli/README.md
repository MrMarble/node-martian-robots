# Martian Robots CLI

This package is a command line interface for [Core](packages/core).

## Installation

### Locally

```
yarn global add mrmarble/node-martian-robots
```

### Docker

```bash
#interactive mode
docker run -it mrmarble/martian-robots-cli -i

#input file using a file volume
docker run -it -v "$pwd\input.txt:/input.txt" mrmarble/martian-robots-cli -s input.txt

#ouput file using a folder volume
docker run -it -v "$pwd\fixtures:/fixtures" mrmarble/martian-robots-cli -s fixtures/input.txt -o fixtures/output.txt
```

## Usage

```bash
Usage: Martian Robots [options]

Options:
  -v, --version        output the version number
  -s, --source <file>  Input file
  -o, --output <file>  Output file. Defaults to stdout
  -i, --interactive    Run interactive console
  -h, --help           display help for command
```

### Interactive mode

You can use the modifier `-i` to run a interactive session:

[![asciicast](https://asciinema.org/a/by94lLqeReH3RdwN0QfOY4G8B.svg)](https://asciinema.org/a/by94lLqeReH3RdwN0QfOY4G8B)
