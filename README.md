dplyr-cli
=========

A CLI tool to manage DPLYR

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dplyr-cli.svg)](https://npmjs.org/package/dplyr-cli)
[![Downloads/week](https://img.shields.io/npm/dw/dplyr-cli.svg)](https://npmjs.org/package/dplyr-cli)
[![License](https://img.shields.io/npm/l/dplyr-cli.svg)](https://github.com/dplyr-dev/dplyr-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dplyr-cli
$ dplyr COMMAND
running command...
$ dplyr (-v|--version|version)
dplyr-cli/0.0.2 darwin-x64 node-v10.6.0
$ dplyr --help [COMMAND]
USAGE
  $ dplyr COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dplyr auth`](#dplyr-auth)
* [`dplyr autocomplete [SHELL]`](#dplyr-autocomplete-shell)
* [`dplyr deployments:create`](#dplyr-deploymentscreate)
* [`dplyr deployments:ls`](#dplyr-deploymentsls)
* [`dplyr deployments:open`](#dplyr-deploymentsopen)
* [`dplyr help [COMMAND]`](#dplyr-help-command)
* [`dplyr machines:create MACHINE NAME [MACHINETYPE]`](#dplyr-machinescreate-machine-name-machinetype)
* [`dplyr machines:dashboard`](#dplyr-machinesdashboard)
* [`dplyr machines:delete [FILE]`](#dplyr-machinesdelete-file)
* [`dplyr machines:file-manager`](#dplyr-machinesfile-manager)
* [`dplyr machines:ls`](#dplyr-machinesls)
* [`dplyr machines:open`](#dplyr-machinesopen)
* [`dplyr update [CHANNEL]`](#dplyr-update-channel)

## `dplyr auth`

Authenticate into the CLI

```
USAGE
  $ dplyr auth

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr auth
  ? API key: API_KEY_FROM_DASHBOARD
```

_See code: [src/commands/auth.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/auth.ts)_

## `dplyr autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ dplyr autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ dplyr autocomplete
  $ dplyr autocomplete bash
  $ dplyr autocomplete zsh
  $ dplyr autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `dplyr deployments:create`

Create a deployment

```
USAGE
  $ dplyr deployments:create

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr deployments:create
```

_See code: [src/commands/deployments/create.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/deployments/create.ts)_

## `dplyr deployments:ls`

List All Deployments Available

```
USAGE
  $ dplyr deployments:ls

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr deployments:ls
```

_See code: [src/commands/deployments/ls.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/deployments/ls.ts)_

## `dplyr deployments:open`

Open the Link of the Deployment

```
USAGE
  $ dplyr deployments:open

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr machines:open
```

_See code: [src/commands/deployments/open.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/deployments/open.ts)_

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

## `dplyr machines:create MACHINE NAME [MACHINETYPE]`

Create A Machine takes name and type

```
USAGE
  $ dplyr machines:create MACHINE NAME [MACHINETYPE]

OPTIONS
  -h, --help               show CLI help
  -t, --type=Pro|Ultimate  (required) Type of Machine Either Pro or Ultimate

EXAMPLE
  $ dplyr machines:create
```

_See code: [src/commands/machines/create.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/machines/create.ts)_

## `dplyr machines:dashboard`

Preview the Dashboard of the Machine

```
USAGE
  $ dplyr machines:dashboard

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr machines:dashboard
```

_See code: [src/commands/machines/dashboard.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/machines/dashboard.ts)_

## `dplyr machines:delete [FILE]`

Delete a machine completely

```
USAGE
  $ dplyr machines:delete [FILE]

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr machines:delete
```

_See code: [src/commands/machines/delete.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/machines/delete.ts)_

## `dplyr machines:file-manager`

Preview the file manager of the machine

```
USAGE
  $ dplyr machines:file-manager

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr machines:file-manager
```

_See code: [src/commands/machines/file-manager.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/machines/file-manager.ts)_

## `dplyr machines:ls`

List All Machines Available

```
USAGE
  $ dplyr machines:ls

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr machines:ls
```

_See code: [src/commands/machines/ls.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/machines/ls.ts)_

## `dplyr machines:open`

Open the Link of the Machine

```
USAGE
  $ dplyr machines:open

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ dplyr machines:open
```

_See code: [src/commands/machines/open.ts](https://github.com/dplyr-dev/dplyr-cli/blob/v0.0.2/src/commands/machines/open.ts)_

## `dplyr update [CHANNEL]`

update the dplyr CLI

```
USAGE
  $ dplyr update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_
<!-- commandsstop -->
