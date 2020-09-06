import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'
const inquirer = require('inquirer')

export default class Redplyr extends Command {
  static description = 'ReDPLYR a deployment'

  static examples = [
    `$ dplyr deployments:redplyr
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    deploymentId: flags.string({ required: false, name: "deploymentId", char: "i" })
  }

  static args = [{ name: 'file' }]

  async run() {
    cli.action.start("Listing Deployments")
    const { args, flags } = this.parse(Redplyr)
    var token = await this.auth()
    var req = await axios.get("https://api.dplyr.dev/api/v1/requests/zapier", {
      headers: {
        "Authorization": "Token " + token
      }
    })
    var data = req.data;

    cli.action.stop()
    if (!flags.deploymentId) {
      var list = await inquirer.prompt({ "type": "list", "name": "choosed", "message": "Choose the deployment you want to ReDPLYR", "choices": this.getChoicesList(data) })
      var machine = this.getSingleMachineById(data, list.choosed)

    } else {

      var machine = this.getSingleMachineById(data, flags.deploymentId)
    }
    cli.action.start("ReDPLYRing")
    var reqt = await axios.post("https://api.dplyr.dev/api/v1/requests/redplyr-zapier", { "requestId": machine._id }, {
      headers: {
        "Authorization": "Token " + token
      }
    })
    cli.action.stop();
    this.log(chalk.blue("Successfully ReDPLYRed!"))
  }

  getSingleMachineById(data: any, id: string) {
    var returned;
    data.forEach((el: any) => {
      if (el._id === id)
        returned = el;
      else { }

    });
    if (!returned) {
      return { "error": "Not Found Error E101 Contact the Support", "vmUsername": "Not Found Error E101 Contact the Support", "adminPassword": "Not Found Error E101 Contact the Support", "publicIp": "", "machineName": "", "_id": "Doesn't exist" };
    }
    return returned;
  }
  getChoicesList(data: any) {
    var list: Array<Object> = []
    data.forEach((el: any) => {
      if (el.status) {

      } else {
        list.push({ "name": el.requestName, "value": el._id })
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
