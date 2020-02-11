/* backpack config */
module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/app2.js'
    return config
  }
}
