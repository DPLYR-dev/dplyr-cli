dplyr
=====

A CLI tool to manage DPLYR from

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dplyr.svg)](https://npmjs.org/package/dplyr)
[![Downloads/week](https://img.shields.io/npm/dw/dplyr.svg)](https://npmjs.org/package/dplyr)
[![License](https://img.shields.io/npm/l/dplyr.svg)](https://github.com/dplyr-dev/dplyr-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dplyr
$ dplyr COMMAND
running command...
$ dplyr (-v|--version|version)
dplyr/0.0.1 darwin-x64 node-v10.13.0
$ dplyr --help [COMMAND]
USAGE
  $ dplyr COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dplyr hello [FILE]`](#dplyr-hello-file)
* [`dplyr help [COMMAND]`](#dplyr-help-command)

## `dplyr hello [FILE]`

describe the command here

```
USAGE
  $ dplyr hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ dplyr hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.1/src/commands/hello.ts)_

## `dplyr help [COMMAND]`

display help for dplyr

```
USAGE
  $ dplyr help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
