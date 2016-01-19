var GitHubApi = require("github");

module.exports = function(config) {

  var accessToken = (config.accessToken) ? config.accessToken : false,
      github = new GitHubApi({
        version: config.version || "3.0.0",
        debug: config.debug || false,
        protocol: "https",
        host: config.host || "api.github.com",
        timeout: config.timeout || 5000,
        headers: {
            "user-agent": "BB8 Commander"
        }
      });

  if(accessToken) {
    github.authenticate({
      type: 'oauth',
      token: accessToken
    });
  }

  return github;

};