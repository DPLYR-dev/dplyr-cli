import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'
const inquirer = require('inquirer')
const isUndefined = require("is-undefined");

export default class MachineInfo extends Command {
  static description = 'See details about a machine'

  static examples = [
    `$ dplyr machines:info
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {
    cli.action.start("Listing Machines")
    const { args, flags } = this.parse(MachineInfo)
    var token = await this.auth()
    var req = await axios.get("https://api.dplyr.dev/api/v1/machines", {
      headers: {
        "Authorization": "Token " + token
      }
    })
    var data = req.data;
    cli.action.stop()
    var list = await inquirer.prompt({ "type": "list", "name": "choosed", "message": "Choose the machine you want to open its link", "choices": this.getChoicesList(data) })
    var machine = this.getSingleMachineById(data, list.choosed)
    this.log(chalk.blue(` Name: `+"https://"+machine.host))
    this.log(chalk.blue(` Type: `+machine.type))
    this.log(chalk.blue(` Status: `+ machine.status ? machine.status: " Status: Running"))
    this.log(chalk.blue(` URL: `+"https://"+machine.host))
    this.log(chalk.blue(` Public IP: `+"http://"+machine.publicIp))
    this.log(chalk.blue(` Admin Username: `+machine.vmUsername))
    this.log(chalk.blue(` Admin Passowrd: `+machine.adminPassword))
  }

  getSingleMachineById(data: any, id: string) {
    var returned;
    data.forEach((el: any) => {
      if (el._id === id)
        returned = el;
      else { }
    });
    if (!returned)
      return { _id: '5f46dc40a662ff000bb1381f',
      type: 'Pro',
      machineName: 'Ahmed Metwaly',
      vmUsername: 'ubuntu',
      host: 'large-eel.dplyr.dev',
      publicIp: '184.73.39.18',
      dnsId: '59fd3b643332427b128406e78433f7e7',
      adminPassword: 'Hello',
      status:true,
      createdAt: '2020-08-26T22:04:45.505Z',
      updatedAt: '2020-08-26T22:04:45.505Z',
      __v: 0 };
    return returned;
  }

  getChoicesList(data: any) {
    var list: Array<Object> = []
    data.forEach((el: any) => {
      if (el.status) {

      } else {
        list.push({ "name": el.machineName, "value": el._id })
      }
    });
    return list;
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
