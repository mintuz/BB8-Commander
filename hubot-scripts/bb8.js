module.exports = function(robot) {
    robot.respond(/ask BB-8 to turn (.*)/i, function(msg) {
    var color, data;
    color = msg.match[1];
      data = JSON.stringify({
        mode: 'sphero',
        command: 'color',
        value: color
      });
    return robot.http("http://localhost:4000")
                .header('Content-Type', 'application/json')
                .post(data)(function(err, res, body) {
        if (res.statusCode !== 200) {
          return msg.send("Request didn't come back HTTP 200 :(");
        } else {
          return msg.send("bb-8 is now " + color + "!");
        }
    });
  });
}
