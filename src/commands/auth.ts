import { Command, flags } from '@oclif/command'
var inquirer = require('inquirer')
import axios from "axios"

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
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
  }


  async run() {
    const { args, flags } = this.parse(Hello);
    var tokenff;
    try {
      tokenff = await fse.readJsonSync(path.join(__dirname, '..', '..', 'config.json'))

    } catch (e) {
      this.authenticate()
      return;
    }
    if (tokenff?.token) {
      this.log(chalk.red("User already exists"))
      var deleteUser = await inquirer.prompt({ "type": "confirm", "name": "do", "message": "Do you want to delete the current user?" })
      if (deleteUser.do) {
        fse.removeSync(path.join(__dirname, "..", "..", "config.json"))
        this.authenticate()
      } else {
        this.exit(0)
      }
    }

  }
  async authenticate() {
    var { token } = await inquirer.prompt({ "type": "input", "name": "token" })
    var req;
    try {
      req = await axios.get("https://api.dplyr.dev/api/v1/requests/", {
        headers: {
          "Authorization": "Token " + token
        }
      })
    } catch (e) {
      this.error(chalk.red("AUTH FAILED"))
    }

    const data = new Uint8Array(Buffer.from('{"token":"' + token + '"}'));

    fs.writeFile(path.join(__dirname, "..", "..", "config.json"), data, (err: any) => {
      if (err)
        console.log(err)
    })

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
    this.log(chalk.blue("Authintcated User: " + req.data.connectionLabel))
  }
}
