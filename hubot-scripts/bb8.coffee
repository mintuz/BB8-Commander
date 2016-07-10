module.exports = (robot) ->
  robot.respond /ask BB-8 to turn (.*)/i, (msg) ->
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

  robot.respond /ask BB-8 if he's got any dance moves/i, (msg) ->
    data = JSON.stringify({
       mode: 'custom',
       command: 'dance'
    })
    robot.http("http://localhost:4000")
      .header('Content-Type', 'application/json')
      .post(data) (err, res, body) ->
        if res.statusCode isnt 200
          msg.send "Request didn't come back HTTP 200 :("
        else
         msg.send "bb-8 says :beep: :beep: he's got your moves right here! :+1:"
