const { 
    override,
  } = require("customize-cra");
  
  module.exports = {
    webpack: override(
        (config) => {
          config.plugins[0].options.filename = '.server.html'
          return config;
        }
    )
  };