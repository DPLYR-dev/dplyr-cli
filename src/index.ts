var Preferences = require('preferences')
var prefs = new Preferences("dev.dplyr.cli", {
  auth:{
    token: "aa"
  }
}, {
  encrypt: false,
  format: 'json'
})
export { run } from '@oclif/command'
