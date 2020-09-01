import { Command, flags } from '@oclif/command'
var inquirer = require('inquirer')
import axios from "axios"
const chalk = require('chalk');

export default class Hello extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ dplyr hello
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({ char: 'n', description: 'name to print' }),
    // flag with no value (-f, --force)
    // force: flags.boolean({ char: 'f' }),
  }

  // static args = [{ name: 'file' }]

  async run() {
    const { args, flags } = this.parse(Hello)
    var { token } = await inquirer.prompt({ "type": "input", "name": "token" })
    var req;
    try {
      req = await axios.get("https://api.dplyr.dev/api/v1/requests/zapier", {
        headers: {
          "Authorization": "Token " + token
        }
      })
    } catch (e) {
      this.error(chalk.red("AUTH FAILED"))
    }
    
    
    
    
    this.log(chalk.blue(`
    
    
    ██████╗ ██████╗ ██╗  ██╗   ██╗██████╗ 
    ██╔══██╗██╔══██╗██║  ╚██╗ ██╔╝██╔══██╗
    ██║  ██║██████╔╝██║   ╚████╔╝ ██████╔╝
    ██║  ██║██╔═══╝ ██║    ╚██╔╝  ██╔══██╗
    ██████╔╝██║     ███████╗██║   ██║  ██║
    ╚═════╝ ╚═╝     ╚══════╝╚═╝   ╚═╝  ╚═╝
    
    
    
    `))
    this.log(chalk.green("SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS"))
    this.log(chalk.green("SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS"))
    this.log(chalk.green("             AUTH SUCCESS              "))
    this.log(chalk.green("SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS"))
    this.log(chalk.green("SUCCESS SUCCESS SUCCESS SUCCESS SUCCESS"))
    this.exit(0)
  }
}
