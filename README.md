# BB8 Commander
A Node CLI Tool for Sphero BB8 Robot.

![BB8 Rolling like he's owning](http://i.imgur.com/00sZIf3.gif)

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
* `node index.js tweet --hash-tag="bb8" --delay 5000` - Command to search twitter and run the first hashtag it finds as a command. Eg a tweet "#disco #bb8" would run the `disco` command --consumer-key xxx --consumer-secret xxx --access-token-key xxx --access-token-secret xxx

# Contributors
* [@mintuz](http://twitter.com/mintuz)
* [@shaunbent](http://twitter.com/shaunbent)
* [@citypaul](http://twitter.com/paulhammond)

# Want to contribute?

Go ahead, fork it, make a change, issue a PR. We welcome new actions and bug fixes. 
