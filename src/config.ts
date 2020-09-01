import {Command} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'

export default class extends Command {
  async run() {
    const userConfig = await fs.readJSON(path.join(this.config.configDir, 'config.json'))

    this.log('User config:')
    console.dir(userConfig)
  }
}