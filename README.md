# BB8 Commander
A Node CLI Tool for Sphero BB8 Robot.

# Install
Not yet on npm so you'll have to do it the good'ol fasioned way with a cheeky git clone

`git clone git@github.com:mintuz/bb8-commander.git`
`npm install`
`node index.js setup`

# Commands

### Utility Commands
* `node index.js setup` - Command to save your BB8 Unit UUID to config for future reference
* `node index.js disconnect` - Command to disconnect from your BB8 Unit

### Action Commands
* `node index.js disco` - Command to turn your BB8 Unit into a shining disco ball in the night
* `node index.js weather --city="manchester" --country="uk" --api-key="ABCD"` - Command to turn your BB8 Unit into your very own weather reporter, uses OpenWeather so be sure to get your own API key

# Contributors
* [@mintuz](http://twitter.com/mintuz)
* [@shaunbent](http://twitter.com/shaunbent)

# Want to contribute?

Go ahead, fork it, make a change, issue a PR. We welcome new actions and bug fixes. 
