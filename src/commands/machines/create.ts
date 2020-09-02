import { Command, flags } from '@oclif/command'
import axios from 'axios'
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")

export default class CreateMachine extends Command {
  static description = 'Create A Machine takes name and type'

  static examples = [
    `$ dplyr machines:create
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    type: flags.string({ char: 't', description: 'Type of Machine Either Pro or Ultimate', options: ['Pro', 'Ultimate'], required: true }),

  }

  static args = [{ name: 'Machine Name', required: true }, { name: "machineType", options: ['a', 'b'], }]

  async run() {
    const { args, flags } = this.parse(CreateMachine)
    var token = await this.auth()
    console.log(token)
    this.log(args["Machine Name"] + flags.type)
  }

  auth = async (): Promise<string> => {
    return new Promise<string>(async (resolve) => {
      var reve = "false";
      var token;
      try {
        token = await fse.readJsonSync(path.join(__dirname, '..', '..', '..', 'config.json'))
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
