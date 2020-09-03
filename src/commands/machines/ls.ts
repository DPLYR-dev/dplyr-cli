import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'

export default class ListMachines extends Command {
  static description = 'List All Machines Available'

  static examples = [
    `$ dplyr machines:ls
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {
    cli.action.start("Listing Machines")
    const { args, flags } = this.parse(ListMachines)
    var token = await this.auth()
    var req = await axios.get("https://api.dplyr.dev/api/v1/machines", {
      headers:{
        "Authorization":"Token "+token
      }
    })
    var data = req.data;
    var datar: Array<Object> = [];
    data.forEach((el: any) => {
      delete el._id
      delete el.userId
      delete el.awsId
      delete el.vmUsername
      delete el.host
      delete el.PublicIP
      delete el.allocationId
      delete el.createdAt
      delete el.updatedAt
      delete el.awsInfo
      delete el.__v
      delete el.dnsId
      delete el.adminPassword
      if (el.status){
        
      } else {
        
        datar.push(el)
      }
    });
    cli.action.stop()
    this.log(chalk.blue(`For more details about a machine run '$ dplyr machines:info "App Name"' `))
    this.log(chalk.blue("Here's a list of your machines"))
    this.log(chalk.blue("============"))
    datar.forEach((el: any) => {
      this.log(chalk.blue(el.machineName))
    });
    this.log(chalk.blue("============"))
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
