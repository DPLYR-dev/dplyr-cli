import {Command, flags} from '@oclif/command'

export default class DeleteMachine extends Command {
  static description = 'Delete a machine completely'

  static examples = [
    `$ dplyr machines:delete
`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(DeleteMachine)

  }
}
