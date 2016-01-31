# BB8 Commander
A Node CLI Tool for Sphero BB8 Robot using the [Sphero Javascript SDK](http://sdk.sphero.com/community-apis/javascript-sdk/)

![BB8 Rolling like he's owning](http://i.imgur.com/00sZIf3.gif)

# Install
Not yet on npm so you'll have to do it the good'ol fasioned way with a cheeky git clone

* `git clone git@github.com:mintuz/bb8-commander.git`
* `npm install`
* `node index.js setup`
* Use commands below

# Commands

### Utility Commands
* `node index.js setup` - Command to save your BB8 Unit UUID to config for future reference
* `node index.js disconnect` - Command to disconnect from your BB8 Unit

### Action Commands
* `node index.js disco` - Command to turn your BB8 Unit into a shining disco ball in the night
* `node index.js roll` - A simple command to make your BB8 Randomly roll in any direction.
* `node index.js desk-buddy` - A command to keep you company whilst working at your desk. Place in it's charging station to watch its head move round randomly.
* `node index.js weather --city="manchester" --country="uk" --api-key="ABCD"` - Command to turn your BB8 Unit into your very own weather reporter, uses OpenWeather so be sure to get your own API key
* `node index.js tweet --hash-tag="bb8" --delay=5000` - Command to search twitter and run the first hashtag it finds as a command. Eg a tweet "#disco #bb8" would run the `disco` command --consumer-key xxx --consumer-secret xxx --access-token-key xxx --access-token-secret xxx
* `node index.js power` - A command to get details of the battery state.
* `node index.js express --port=4000` - Command to run an express server which has a single POST endpoint which you can send a JSON object to. See below for more details.

### Express Server

Having the ability to run an Express server to issue commands to the BB8 unit opens up a bunch of possibilities. One of the main benefits of having an Express server is that you can integrate into [IFTTT](https://ifttt.com/) and at that point, you have entered the Internet of things.

To get started is really easy, all you need to do is run `node index.js express --port=4000` adn once your BB8 is connected, an Express server will be started.

You can then send commands directly to it via a POST request. It supports any SpheroSDK command as well as custom commands we have created. See below for some examples.

### Native Commands

With native commands, the response body will include information the BB8 exposes once that command has been executed. Read the Sphero documentation on what data it returns. http://sdk.sphero.com/community-apis/javascript-sdk/

#### Running the `color` command

Post Request - localhost:3000/

Request Body

```
{
  "mode":"sphero",
  "command":"color",
  "value": "yellow"
}
```

#### Running the `roll` command

Post Request - localhost:3000/

Request Body

```
{
  "mode":"sphero",
  "command":"roll",
  "value": [130, 50]
}
```

With this request, we are passing an array and that's because the roll command in Sphero SDK requires multiple parameters. This is just a simple way to pass those values to that command.

### Custom Commands

#### Running the `disco` command

Post Request - localhost:3000/

Request Body

```
{
  "mode":"custom",
  "command":"disco"
}
```

#### Running the `tweet` command

POST Request - localhost:3000/

Request Body

```
{
  "mode":"custom",
  "command":"tweet",
  "value": {
    "delay": 30,
    "consumerKey": "YOUR_CONSUMER_KEY",
    "consumerSecret": "YOUR_CONSUMER_SECRET",
    "accessTokenKey": "YOUR_ACCESS_TOKEN_KEY",
    "accessTokenSecret": "YOUR_ACCESS_TOKEN_SECRET"
  }
}
```

Obviously you wouldn’t pass your OAuth information like this (BB8 Commander supports environment variables for secure data) but the important thing to note here is, anything that can be passed to the CLI tool can also be passed into the express server endpoint.

A suite difference between native commands and custom commands is that native commands that require multiple parameters will be passed as an array whilst custom commands will be objects. The reason for this is custom commands are key value pairs due to them sharing the same code as the CLI tool.

# Contributors
* [@mintuz](http://twitter.com/mintuz)
* [@shaunbent](http://twitter.com/shaunbent)
* [@citypaul](http://twitter.com/paulhammond)
* [@sud-puth](http://twitter.com/sud_)

# Want to contribute?

Go ahead, fork it, make a change, issue a PR. We welcome new actions and bug fixes.
