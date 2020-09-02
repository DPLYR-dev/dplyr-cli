import { Command, flags } from '@oclif/command'
import axios from 'axios'
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

export default class Hello extends Command {
  static description = 'Create A Machine takes name and type'

  static examples = [
    `$ dplyr machines:ls
hello world from ./src/hello.ts!
`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    type: flags.string({ char: 't', description: 'Type of Machine Either Pro or Ultimate', options: ['Pro', 'Ultimate'], required: true }),

  }

  static args = [{ name: 'Machine Name', required: true }, { name: "machineType", options: ['a', 'b'], }]

  async run() {
    const { args, flags } = this.parse(Hello)
    var token = await fse.readJsonSync(path.join(__dirname, '..', '..', '..', 'config.json'))
    console.log(token)
    this.log(args["Machine Name"] + flags.type)
    // axios.post("https://api.dplyr.dev/api/v1/machines/create")
  }
}
