import { Command, flags } from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'
const inquirer = require('inquirer')
import simpleGit, { SimpleGit } from 'simple-git';
const git: SimpleGit = simpleGit();

export default class CreateDeployment extends Command {
  static description = 'Create a deployment'

  static examples = [
    `$ dplyr deployments:create
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' })
  }


  async run() {
    const { args, flags } = this.parse(CreateDeployment)
    var token = await this.auth()
    var repo = await this.getRepo()
    var technology = await this.chooseTechnology()
    var database = await this.getDatabase()
    var machine = await this.getMachine(token)
    console.log(JSON.stringify(repo) + "   " + technology + "     " + JSON.stringify(database) + "     " + machine)

  }


  getMachine = async (token: string): Promise<Object> => {
    return new Promise<Object>(async (resolve) => {
      var req = await axios.get("https://api.dplyr.dev/api/v1/machines", {
        headers: {
          "Authorization": "Token " + token
        }
      })
      var data = req.data;

      cli.action.stop()
      var list = await inquirer.prompt({ "type": "list", "name": "choosed", "message": "Choose the machine you want to deploy on", "choices": this.getMachinesList(data) })
      resolve(this.getSingleMachineById(data, list.choosed)._id)
    })
  }

  getSingleMachineById(data: any, id: string) {
    var returned;
    data.forEach((el: any) => {
      if (el._id === id)
        returned = el;
      else { }

    });
    if (!returned) {
      return { "error": "Not Found Error E101 Contact the Support", "vmUsername": "Not Found Error E101 Contact the Support", "adminPassword": "Not Found Error E101 Contact the Support", "publicIp": "", "_id": "Doesn't exist" };
    }
    return returned;
  }

  getMachinesList(data: any) {
    var list: Array<Object> = []
    data.forEach((el: any) => {
      if (el.status) {

      } else {
        list.push({ "name": el.machineName, "value": el._id })
      }
    });
    return list;
  }

  getDatabase = async (): Promise<Object> => {
    return new Promise<Object>(async (resolve) => {
      var { dodatabase } = await inquirer.prompt({ "type": "confirm", "name": "dodatabase", "message": "Do you use a database?" })
      if (!dodatabase) {
        resolve({ "database": false })
        return;
      }
      var { choosed } = await inquirer.prompt({ "type": "list", "message": "Enter your database of choice", "name": "choosed", "choices": [{ "name": "MongoDB", "value": "mongodb" }, { "name": "mysql", "value": "mysql" }] })
      var { name } = await inquirer.prompt({ "type": "input", "message": "Enter your database name:", "name": "name" })
      var { username } = await inquirer.prompt({ "type": "input", "message": "Enter your database username:", "name": "username" })
      var { password } = await inquirer.prompt({ "type": "password", "message": "Enter your git password:", "name": "password", "mask": true })
      resolve({ "database": true, choosed, name, username, password })
    })
  }

  getRepo = async (): Promise<Object> => {
    return new Promise<Object>(async (resolve) => {
      cli.action.start("Getting your repos")
      var remotes = await git.getRemotes(true)
      cli.action.stop()
      if (remotes === []) {
        this.log(chalk.red("You didn't push your code to a remote repositiory yet"))
        this.exit()
      }
      var prOrPb;
      cli.action.start("Analyzing your repo")
      prOrPb = axios.get(remotes[0].refs.push).then((data: any) => {
        cli.action.stop()
        resolve({ "repo": remotes[0].refs.push, "visiblity": "public" })
      }).catch(async (e) => {
        cli.action.stop()
        resolve({ "repo": remotes[0].refs.push, "visiblity": "private", "cred": await this.privateRepo() })
      })
    })
  }

  async chooseTechnology() {
    var { choosed } = await inquirer.prompt({ "type": "list", "message": "Enter your technology of choice", "name": "choosed", "choices": [{ "name": "PHP", "value": "php" }, { "name": "Node.js", "value": "nodejs" }] })
    return choosed;
  }

  async privateRepo() {
    var { username } = await inquirer.prompt({ "type": "input", "message": "Enter your git username:", "name": "username" })
    var { password } = await inquirer.prompt({ "type": "password", "message": "Enter your git password:", "name": "password", "mask": true })
    return { username, password }
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
