import {Command, flags} from '@oclif/command'
const fse = require('fs-extra')
const path = require('path')
const chalk = require("chalk")
import axios from 'axios'
import cli from 'cli-ux'
const inquirer = require('inquirer')

export default class CreateDeployment extends Command {
  static description = 'Create a deployment'

  static examples = [
    `$ dplyr deployments:create
`,
  ]

  static flags = {
    help: flags.help({char: 'h'})
  }


  async run() {
    const {args, flags} = this.parse(CreateDeployment)
    
  }
}
