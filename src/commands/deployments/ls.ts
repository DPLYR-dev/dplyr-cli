import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'

export default class ListDeployments extends Command {
  static description = 'List All Deployments Available'

  static examples = [
    `$ dplyr deployments:ls
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }


  async run() {
    cli.action.start("Listing Deployments")
    const { args, flags } = this.parse(ListDeployments)
    var token = await this.auth()
    var req = await axios.get("https://api.dplyr.dev/api/v1/requests/zapier", {
      headers:{
        "Authorization":"Token "+token
      }
    })
    var data = req.data;
    var datar: Array<Object> = [];
    data.forEach((el: any) => {
      delete el._id
      delete el.userId
      delete el.privateKey
      delete el.email
      delete el.githubPassword
      delete el.githubUsername
      delete el.vmUsername
      delete el.projectUrl
      delete el.createdAt
      delete el.updatedAt
      delete el.host
      delete el.__v
      delete el.dnsId
      delete el.redplyrDates
      if (el.status){
        
      } else {
        
        datar.push(el)
      }
    });
    cli.action.stop()
    this.log(chalk.blue(`For more details about a deployment run '$ dplyr deployments:info "App Name"' `))
    this.log(chalk.blue("Here's a list of your deployments"))
    this.log(chalk.blue("============"))
    datar.forEach((el: any) => {
      this.log(chalk.blue(el.requestName))
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
