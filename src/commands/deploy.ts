import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import CreateMachine from "./machines/create"
import CreateDeployment from "./deployments/create"
const inquirer = require('inquirer')

export default class Deploy extends Command {
  static description = 'Deploy a project in a single command'

  static examples = [
    `$ dplyr deploy
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {
    const { args, flags } = this.parse(Deploy)
    var token = await this.auth()
    var {name} = inquirer.prompt({"type":"input", "name":"name", "message":"Enter the  name for the machine and the deployment that will be created"})
    await CreateMachine.run(["-n", name])
    await CreateDeployment.run(["-n", name])
  }

  auth = async (): Promise<string> => {
    return new Promise<string>(async (resolve) => {
      var reve = "false";
      var token;
      try {
        token = await fse.readJsonSync(path.join(__dirname, '..', '..', 'config.json'))
        reve = token.token;
      } catch (e) {
        this.log(chalk.red(
          `
You have to be authenticated 
Authenticate using '$ dplyr auth'
`
        ))
        return;
      }
      resolve(reve);
    });
  };
}
