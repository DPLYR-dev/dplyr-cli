import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'
const inquirer = require('inquirer')
const base64url = require('base64-url')

export default class PreveiwFileManager extends Command {
  static description = 'Preview the file manager of the machine'

  static examples = [
    `$ dplyr machines:file-manager
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {
    cli.action.start("Listing Machines")
    const { args, flags } = this.parse(PreveiwFileManager)
    var token = await this.auth()
    var req = await axios.get("https://api.dplyr.dev/api/v1/machines", {
      headers: {
        "Authorization": "Token " + token
      }
    })
    var data = req.data;

    cli.action.stop()
    var list = await inquirer.prompt({ "type": "list", "name": "choosed", "message": "Choose the machine you want to open its dashboard", "choices": this.getChoicesList(data) })
    var machine = this.getSingleMachineById(data, list.choosed)
    // this.log(chalk.blue(` Username: ` + machine.vmUsername))
    // this.log(chalk.blue(` Password: ` + machine.adminPassword))
    cli.open("https://file-manager.dplyr.dev/#/c/" + machine.vmUsername + "/" + machine.publicIp + "/" + base64url.encode(`{"t":"ftp","c":{"v":1,"p":"`+machine.adminPassword+`"}}`))
    // this.log(chalk.red(` URL: ` + "https://" + machine.publicIp + ":9090"))
    this.log(chalk.red("https://file-manager.dplyr.dev/#/c/" + machine.vmUsername + "/" + machine.publicIp + "/" + base64url.encode(`{"t":"ftp","c":{"v":1,"p":"`+machine.adminPassword+`"}}`)))
  }

  getSingleMachineById(data: any, id: string) {
    var returned;
    data.forEach((el: any) => {
      if (el._id === id)
        returned = el;
      else { }

    });
    if (!returned) {
      return { "error": "Not Found Error E101 Contact the Support", "vmUsername": "Not Found Error E101 Contact the Support", "adminPassword": "Not Found Error E101 Contact the Support", "publicIp": "" };
    }
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
