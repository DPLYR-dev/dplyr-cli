import {Command, flags} from '@oclif/command'

export default class CreateDeployment extends Command {
  static description = 'Create a deployment'

  static examples = [
    `$ dplyr deployments:create
`,
  ]

  static flags = {
    help: flags.help({char: 'h'})
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(CreateDeployment)
    
  }
}
