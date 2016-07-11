# How to have Hubot send commands to BB-8

![Hubot in Slack asking BB-8 to turn blue](https://cloud.githubusercontent.com/assets/11529908/16711345/7cd9a412-460b-11e6-8697-0cf52443047c.png)

Although I got a BB-8 earlier this year, the little guy sat in his box for 6 months. :( I’ve never worked with javascript before, so I couldn’t follow any of the node.js instructions to talk to him. A friend from Mississippi State spent a couple of Saturdays with me showing me the basics of javascript… and the rest is history!

## Part 1 — Connecting BB-8 to your laptop

Besides overcoming my javascript and node.js mental block, connecting to BB-8 was the hardest part. My friend and I followed every walkthrough, google search result, etc. we could find until he magically came online…

### Connection walkthrough

We think these are the best steps to getting connected to BB-8: https://www.ladysign-apps.com/developer/connect-play-around-with-bb-8-by-sphero-with-javascript-on-a-mac

### Some troubleshooting tips

1. Make sure BB-8 has power. Yeah, I’m really embarrassed to say I tried to connect to him on zero battery. :(
2. Before you do anything else, make sure you can connect to BB-8 via the Sphero BB-8 iPhone app. This is a great test to make sure he’s got enough power. This will also “wake him up” it seems. Before I can get my node scripts to talk to him, I always have to connect to him via the Sphero BB-8 iPhone app first (then kill the app). BB-8 glows an orange color when he’s ready for instructions from the laptop (he glows orange after you’ve killed the Sphero BB-8 app).
3. Make sure you have bluetooth enabled on your laptop. You won’t see BB-8 as a bluetooth device in the menu, and that’s okay.
4. Make sure you get the right UUID for your device. If you run the advertisement-discovery.js (as mentioned in the above blog post) at a coffee shop, be prepared to discover *a lot* of devices. I grabbed the UUID for the wrong device for a good 30 minutes. :face-palm: The BB-8 device should say something like “hello my local name is: BB-”
5. Reboot all the things! Your laptop and/or your droid. There’s a small white button on the side of the base to reboot him, but you have to pick him up after you reboot him.
6. You can’t connect to BB-8 via your node scripts if BB-8 is still running some other commands from another app. I’ve noticed if you’ve had him do some action from another iPhone app, e.g. Tickle, he won’t accept new commands. You’ll have to disconnect him from that app first.
7. I’ve noticed there’s some “hey whassup?” routine when he gets reset/rebooted from his base. This routine can take a good 10 minutes to finish. You can stop this routine by connecting him via the Sphero BB-8 app.
8. FWIW, you can find the MAC Address for your BB-8 by going to the Sphero BB-8 app (I was using an iPhone)- Settings — Customer Support screen. I recall some scripts allow you to specific a MAC Address, but we eventually went UUID route.
9. And sometimes he won’t power off when it’s time to go back into his box. Kinda freaks me out every time. Somehow he knows… For the record, I for one welcome our new robot overlords.

### Waking BB-8 up — more connection troubleshooting tips

1. Let’s say a few days go by and you’re ready to send more commands from your laptop to BB-8. But BB-8 looks at you with his blank stare. You have to do two things to wake him up
2. Connect to BB-8 via the Sphero BB-8 app first to wake him up
3. Kill the Sphero BB-8 app
4. While he’s still glowing orange, run any script you used previously to connect to him.
You might have to try running your script several times and waiting 3–4 seconds before trying again.

![a happy BB-8 is a glowing BB-8](https://cloud.githubusercontent.com/assets/11529908/16711371/4f3f4f88-460c-11e6-81eb-7005dfc412dc.png)

And sometimes he’s ready to accept scripts from the laptop even when he’s not glowing orange, sigh. It’s a hard life when you’re the size of a kid’s shoe.

## Part 2 — Sending your first commands to BB-8

Yay! Let’s say you got him connected! Now what?

### Setting up the BB8-Commander code

Clone the repo from https://github.com/mintuz/BB8-Commander

Note: you can clone the repo via HTTPS (the standard “git clone <https address>”), so you don’t have to follow their step 1 precisely. Follow the rest of their instructions on the Install section. You’ll need the UUID for setup, but this is a one-time thing.

That animated gif on the BB8-Commander repo cracks me up every time.

You should be able to run

`node index.js disco`

and have BB-8 change the colors. You might need to be patient and count for at least 3–4 seconds before giving up.

### Creating our own Hello BB-8 command

If you got the disco working, let’s move onto the robot equivalent of Hello World by asking BB-8 to turn blue. I picked blue since it is the easiest color for me to say “Yep, he’s listening!”

Under /BB8-Commander/commands, create a new file called helloworld.js with the following code:

```
// Top of HelloWorld.js file
module.exports = function (bb8) {
 console.log(“hello BB-8!!”);
 bb8.color(“blue”);
};
```

Since we’re using the BB8-Commander wrapper, let’s add this command to the known list. Open /BB8-Commander/index.js and after the “//Real Actions” comment (around the disco command code), add the following

```
program
 .command("helloworld")
 .description("BB-8 says hello the only way he can by turning blue")
 .action(function () {
   executeCommand("helloworld");
 });

```
Note: if BB-8 isn’t glowing orange, check out my “waking him up” troubleshooting steps in the previous section.

Remember Sara, we don’t compile javascript code. So let’s run it

`node index.js helloworld`

and we get back our “hello BB-8” from the script!

![hello bb-8 comes back in terminal](https://cloud.githubusercontent.com/assets/11529908/16711396/d0404bb8-460d-11e6-839c-549d3c5194c2.png)

If you’re looking at the wrapper code, you’ll notice BB8-Commander doesn’t include the bb8.color(“blue”) call. This comes from the Sphero SDK which is fortunately a repo. You can get the full list of colors here. Open source is pretty cool that way.

## Part 3— Creating a dance command

My goal is to have Hubot get BB-8 to dance. Now pay close attention, since this is what we call revisionist history. I was pulling out my hair trying to get BB-8 to move his head. Instead, I got him to move around in a random fashion. Since I have no ability to dance, I shall call this algorithm dance_dance_BB8.

> **Important:** these dance commands are really BB-8 trying to roll around but can’t since he’s in his dock station. I haven’t really tried it outside his doc.

Let’s rinse and repeat the previous helloworld steps to create a new command called “dance”, meaning

1. Create a new /BB8-Commander/commands file called dance.js
2. In /BB8-Commander/index.js add a new program method

```
program
 .command("dance")
 .description("dance dance BB-8")
 .action(function () {
   executeCommand("dance");
 });
```

  3.In dance.js, add the following

```
module.exports = function (bb8) {
    console.log("hello BB-8!!");
var movesTimer = setInterval(function() {
        var direction = Math.floor(Math.random() * 360);
        var distance = Math.floor(Math.random() * (150 - 10)) + 10
        bb8.roll(distance, direction);
      }, 100);
var colorTimer = setInterval(function () {
        bb8.randomColor();
    }, 250);
//only bother bb8 for 5 seconds
    setTimeout(function() {
       clearInterval(movesTimer);
       clearInterval(colorTimer);
    }, 5000);
};
```

Make sure you save everything since there’s no compile! Now let’s see BB-8 “dance” :)

**warning:** About 1 out of 10 times BB-8 will try to roll back so quickly he’ll lose his head. It’s quite traumatic the first time you experience it.

[![BB-8 dances so hard his head falls off](https://img.youtube.com/vi/OxssDKjEV6U/0.jpg)](https://www.youtube.com/watch?v=OxssDKjEV6U)

You’ll need to manually Control-C to kill the process after the setTimeout finishes. I had process.exit() in the setTimeout() when BB-8 finishes dancing, but it caused issues with Hubot (the process.exit() disconnected from Hubot, but we’ll get to that later…)

> **aside:** never try to upload a .mov file to medium. It doesn’t like that.

## Part 4 — Talking to an Express server

The reason we’re using the BB8-Commander wrapper is for the Express server code and for the disco code :)

> node index.js express — port=4000 — Command to run an express server which has a single POST endpoint which you can send a JSON object to. See below for more details.

Now that I’m embracing my impostor syndrome, I can finally interpret this sentence. It’s like the past 10 years of the computer world has gone online for me!

First, let’s make sure we can start the Express server. Run the following

`node index.js express --port=4000`

You should see “Server listening on port 4000” in the terminal and BB-8 glowing a couple of different colors.

Now we’re going to talk to the Express server via cURL, because I learned that a HTTP POST request cannot be sent via a web URL (who knew?) Thanks to this SO question I figured out how to translate the example json from the BB8 Commander readme to cURL.

Create a new terminal window using Cmd+T, so the express server is running in one window and your cURL calls will be in the other.

![multiple tabs in terminal](https://cloud.githubusercontent.com/assets/11529908/16711524/9427df76-4615-11e6-8bbd-f6ba44be0da5.png)

With the express server running in the other window, run the following

`curl -v -H "Content-Type: application/json" -X POST -d '{"mode":"sphero","command":"color","value": "yellow"}' http://localhost:4000`

and BB-8 might respond.

I say “might” because I’ve had some odd luck. If BB-8 doesn’t respond, it means he stopped listening even through the Express server is still running. I’ve noticed that I have to be very fast making the cURL calls (while he’s still glowing). Once BB-8 responds to several of the cURL calls, he seems to stay connected for much, much longer.

![The POST request with the command and value in json](https://cloud.githubusercontent.com/assets/11529908/16711529/c97c7fce-4615-11e6-8f30-987c087d0fde.png)

## Part 5 — Using Ruby to talk to an Express server

*This part is optional, but if you want to talk to BB-8 in non-cURL ways or follow my adventures in impostor syndrome, here’s a Ruby approach to talking to BB-8.*

Once I got cURL working, I realized, “Wait a sec… this is localhost… I can talk to localhost via HTTParty!” and the past 10 years of the computer came online…

### Hello BB-8 World via Ruby

In the same directory as /BB8-Commander/index.js, create a file called requests.rb and use the following code to turn BB-8 blue, because it’s the Hello World of the droid world…

```
require 'httparty'
require 'pp'
def blue
  response = Timeout.timeout(30) do
    HTTParty.post("http://localhost:4000",
      :headers => {
        "Content-Type" => "application/json",
      },
      :body => { "mode" => "sphero",
                  "command" => "color",
                  "value" => "blue"
                }.to_json
    )
  end
pp response
end
blue
```

I had to read this SO question to translate the cURL to HTTParty and then after an hour or so, read this SO question not to forget the “.to_json” part or the headers part. In other words, I had to earn this code!

### Dance BB-8 via Ruby

As the BB8-Commander readme discusses re custom commands, we’ll need to make a couple of updates to our json data:

```
:body => { "mode" => "custom",
           "command" => "dance"
         }.to_json
```

I also recommend creating a new function called dance (see below). And don’t forget to comment out the old blue call as shown!

```
require 'httparty'
require 'pp'
def dance
  response = Timeout.timeout(30) do
    HTTParty.post("http://localhost:4000",
      :headers => {
        "Content-Type" => "application/json",
      },
      :body => { "mode" => "custom",
                  "command" => "dance"
                }.to_json
    )
  end
pp response
end
dance
#blue
```

and now it is time to rock in roll!

Remember, you have to do the cURL call immediately…

1. In one terminal window, run “node index.js express — port=4000"
2. In the 2nd terminal window while BB-8 is still glowing from the Express server connection, run the cURL command from above to make BB-8 change colors
3. Still in the 2nd terminal window, run “ruby requests.rb”

And dance dance BB-8 via Ruby!

### Troubleshooting

Sometimes you’ll have to restart the Express server. Sometimes you’ll have to wait 3–5 seconds for the HTTP POST request to go through. Sometimes you have to run the ruby script while standing on one leg with a Starbucks coffee in your hand facing the space needle.

## Part 6 — Hubot becoming friends with BB-8

Now that we can talk to BB-8 via HTTP POST requests, we can have Hubot make those requests on our behalf.

### Getting Local Hubot Installed

First, let’s get a local instance of Hubot running. We’re going to skip ahead slightly and start going through the walkthrough we’re going to use for Part 7 at https://www.sitepoint.com/spice-up-your-slack-channel-with-hubot/

Create a folder somewhere anywhere for your local hubot to live. then as the walkthrough mentions, run

```
sudo npm install -g hubot coffee-script yo generator-hubot
mkdir test-bot && cd test-bot
yo hubot
```

If you’ve never played with this “yo” thingy before (like me), just press enter the entire time to accept all defaults. One important thing to note. Do not try to name your local bot hubot; otherwise, the script will fail. Locally it doesn’t matter who or what he’s called, so we’ll go with the test-bot default.

![just don’t call local hubot hubot](https://cloud.githubusercontent.com/assets/11529908/16711557/f20a97c2-4616-11e6-85f1-7d6a890558fe.png)

Once “yo” is finished doing its thing (which I’m still learning about), fire up local hubot, i mean, test-bot by running

`bin/hubot`

even if we didn’t call his copy hubot.

You may need to press enter to see the hubot test-bot command prompt:

![the hubot test-bot command prompt](https://cloud.githubusercontent.com/assets/11529908/16711565/186f4b38-4617-11e6-878e-4bbc27d15eab.png)

Since hubot test-bot can’t turn blue for us, we’ll ping him by typing in

`test-bot ping`

![ping pong!](https://cloud.githubusercontent.com/assets/11529908/16711566/2f455f5a-4617-11e6-9987-532eb361e7a1.png)

Press enter again to get the text-bot> back.

### Creating a hubot script for BB-8

Remember optional part 5 where we played with Ruby scripts? This section is why. I wanted to make sure I could call the HTTP POST request correctly from Ruby before I try from Hubot.

Create a file called bb8.coffee at /test-bot/scripts (where you were previously when your ran ./bin/hubot) and add the following coffescript.

What’s going on is whenever we say “test-bot ask bb8 to turn <color>”, hubot test-bot will pass the request along to the Express server.

```
module.exports = (robot) ->
  robot.respond /ask bb8 to turn (.*)/i, (msg) ->
    color = msg.match[1]
    data = JSON.stringify({
       mode: 'sphero',
       command: 'color',
       value: color
    })
    robot.http("http://localhost:4000")
      .header('Content-Type', 'application/json')
      .post(data) (err, res, body) ->
        if res.statusCode isnt 200
          msg.send "Request didn't come back HTTP 200 :("
        else
         msg.send "bb-8 is now #{color}!"
```

I’ll leave you to your coffeescript explorations :)

### Ask Hubot to talk to BB-8

Now let’s run our new BB-8 script. You may want two different terminal windows for all this…

1. Start the Express server (see Part 4)
2. While BB-8 is still glowing, run a few cURL change color commands to keep the connection active (see Part 4). If the cURL commands don’t work, repeat step 1.
3. Start up hubot “bin/hubot” (and press enter to get his command prompt)
4. Type in your command

`test-bot ask BB-8 to turn green`

and if everything has been working so far, BB-8 will turn green!

![a green BB-8 since Hubot requested](https://cloud.githubusercontent.com/assets/11529908/16711576/ea571694-4617-11e6-83bd-d5c5be2b1dc0.png)

### Troubleshooting

Sometimes I forget how I spelled BB-8 in the coffeescript command :) If you need to make any changes to the coffeescript, make sure you restart your hubot test-bot via Control-C and rerunning bin/hubot.

Also make sure there are no newlines in your coffeescript method. This isn’t a primer on coffeescript because I don’t know coffeescript myself, but I believe you separate methods in coffescript using a newline.

### Having local test-bot ask BB-8 to dance

We’re so close…

Now we’re going to create the coffeescript to have Hubot ask BB-8 dance for us.
In the same bb8.coffeescript file, create a newline or two after the first method and add…

```
robot.respond /ask BB-8 if he's got any dance moves/i, (msg) ->
    data = JSON.stringify({
       mode: 'custom',
       command: 'awesome'
    })
    robot.http("http://localhost:4000")
      .header('Content-Type', 'application/json')
      .post(data) (err, res, body) ->
        if res.statusCode isnt 200
          msg.send "Request didn't come back HTTP 200 :("
        else
         msg.send "bb-8 says :beep: :beep: he's got your moves right here! :+1:"
```

Notice there’s no newline between the lines in this method.

Now once more with feeling

1. Start Express server (Part 4)
2. Make a few cURL color calls to keep the connection active (Part 4)
3. Start up local hubot test-bot “bin/hubot” and press enter to get a prompt
4. and now…

`test-bot ask BB-8 if he’s got any dance moves`

and if luck and bluetooth connections are on our side, you should get back

![response from Hubot script with a dancing BB-8](https://cloud.githubusercontent.com/assets/11529908/16711592/4235e7c8-4618-11e6-98f1-6e0079501bb1.png)

## Part 7 — The Grand Finale! Slack Hubot asks BB-8 to dance

The part we’ve all been waiting for.

Skip back over to the walkthrough we started in Part 6 about how to setup Hubot on Slack https://www.sitepoint.com/spice-up-your-slack-channel-with-hubot/ It’s what I followed step by step, minus the putting Hubot on Heroku. For demo purposes, Hubot will only run on my local machine.

I created a team to write this blog post. You might already have hubot installed at work, etc. For my little slack team, I followed the “Integrating Hubot with Slack” instructions from https://www.sitepoint.com/spice-up-your-slack-channel-with-hubot/ to get Hubot installed. 

Follow the section “Where to Find Pre-built Scripts” to make sure you can run other scripts, like pug me, which is the real equivalent of Hello World in the Hubot world.

Next, you want to read the section “Building a Script to Reduce Employee Efficiency” which we already did in a way because we have our bb8.coffeescript already installed in the scripts directory. Planning!

Now jump to the section “To test this, start up Hubot using:” Here’s where I got lost. I didn’t realize that once you run this command,

`HUBOT_SLACK_TOKEN=YOUR_SLACK_API_TOKEN_HERE ./bin/hubot --adapter slack`

Hubot appears online in your slack team. I tried to run this command several times, so I got “port in use” node errors, until I realized, “oh, the robot is working as expected. The human is confused…”

And now putting it all together!

In your local hubot test-bot directory, run

`HUBOT_SLACK_TOKEN=YOUR_SLACK_API_TOKEN_HERE ./bin/hubot — adapter slack`

**Note:** that you won’t get a command prompt when you hit this time in your terminal because hubot is running in slack.

You should see hubot online in slack

![yay! hubot’s here in slack!](https://cloud.githubusercontent.com/assets/11529908/16711599/991f23a6-4618-11e6-9408-4bd42d179879.png)

  2.Run the Express server (part 4)
  3.Run a few cURL color requests to keep the connection to bb-8 active (part 4)
  4.And now start the drumroll… Go to hubot in your direct messages and type

![hey hubot ask BB-8 about those dance moves!](https://cloud.githubusercontent.com/assets/11529908/16711601/c209dfe0-4618-11e6-82c4-246d08f322f2.png)

Here’s the video I posted earlier this morning.

[![Hubot ask BB-8 if he's got any dance moves](https://cloud.githubusercontent.com/assets/11529908/16711633/5c597c76-461a-11e6-843c-29c0d12eca2d.png)](https://twitter.com/saraford/status/750768569344860160)

Enjoy!

## P.S.

Sometimes BB-8 doesn’t want to go back into his box. If he’s still glowing orange (or he recently stopped glowing), he’s still going to try to keep his head in the same position. You can try to connect to him via the Sphero BB-8 iPhone app and then kill the app to try to convince him it’s bedtime. I’ve tried running scripts to disconnect BB-8, but he doesn’t always buy it. Eventually he’ll power off, but you might have to manually carry him out of the coffee shop.

And remember…

I for one welcome our new BB-8 robot overlords!

![yay bb-8](https://cloud.githubusercontent.com/assets/11529908/16711606/24b2640a-4619-11e6-855c-a87e47ea95f6.png)

