import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'
const inquirer = require('inquirer')

export default class OpenDeployment extends Command {
  static description = 'Open the Link of the Deployment'

  static examples = [
    `$ dplyr machines:open
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {
    cli.action.start("Listing Machines")
    const { args, flags } = this.parse(OpenDeployment)
    var token = await this.auth()
    var req = await axios.get("https://api.dplyr.dev/api/v1/requests/zapier", {
      headers: {
        "Authorization": "Token " + token
      }
    })
    var data = req.data;

    cli.action.stop()
    var list = await inquirer.prompt({ "type": "list", "name": "choosed", "message": "Choose the deployment you want to open its link", "choices": this.getChoicesList(data) })
    var deployment = this.getSingleDeploymentById(data, list.choosed)
    cli.open("https://" + deployment.dnsHost)
    this.log(chalk.red(` URL: ` + "https://" + deployment.dnsHost))
  }

  getSingleDeploymentById(data: any, id: string) {
    var returned;
    data.forEach((el: any) => {
      if (el._id === id)
        returned = el;
      else { }
    });
    if (!returned)
      return { "error": "Not Found Error E101 Contact the Support", "vmUsername": "Not Found Error E101 Contact the Support", "adminPassword": "Not Found Error E101 Contact the Support", "publicIp": "", "dnsHost": "https://www.dplyr.dev" };
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
