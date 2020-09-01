<<<<<<< HEAD
<<<<<<< HEAD
import { flags } from '@oclif/command'
import { Command } from '../base'
=======
=======
>>>>>>> parent of b1c9c75... fix plugins 2 and format hello.ts
import {Command, flags} from '@oclif/command'

>>>>>>> parent of b1c9c75... fix plugins 2 and format hello.ts
export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ dplyr hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Hello)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from ./src/commands/hello.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
