var GithubFactory = require('../libs/github-factory');

module.exports = function(options) {

  var githubInstance = GithubFactory({
    accessToken: options.accessToken || false
  });

};