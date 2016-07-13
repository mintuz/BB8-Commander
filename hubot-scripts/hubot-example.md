### How to have Hubot send commands to BB-8

These steps assume you have a working Express server connection with BB-8 and a [local working copy of Hubot](https://hubot.github.com/docs/)

1. Start the Express server `node index.js express --port=4000`
2. Do a couple of `curl` commands to keep the connection to BB-8 active, e.g. `curl -v -H "Content-Type: application/json" -X POST -d '{"mode":"sphero","command":"color","value": "yellow"}' http://localhost:4000` 
3. From your local hubot prompt, run the bb8.js scripts, e.g. `test-bot> test-bot ask BB-8 to turn green`

More info can be found in this [long setup walkthrough blog post](https://medium.com/@saraford/how-to-have-hubot-in-slack-send-commands-to-bb-8-700d2f3c953d#)
