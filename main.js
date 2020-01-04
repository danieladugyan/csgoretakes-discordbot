const Discord = require('discord.js');
const client = new Discord.Client();

const http = require('http');
const fs = require('fs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

port = 6513;
host = '127.0.0.1';
let body = '';
let playerData = "";
server = http.createServer((req, res) => {
  if (req.method == 'POST') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    body = ""

    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      playerData = JSON.parse(body).player;
      playerTeam = playerData.team;
      playerid = playerData.steamid;
      console.log("Receiving data from: "+playerData.name);

      discServer.fetchMember(playerList[Number(playerid)])
        .then((usr) => {
          (playerTeam == 'T') ? usr.setVoiceChannel(channels[0]) : usr.setVoiceChannel(channels[1]);
        })
        .catch(console.error);
      res.end('');
    });
  } else {
    console.log("Not expecting other request types...");
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    let html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
    res.end(html);
  }
});

channels = ['362310585175506944', '650308364299010087']; // [0] matchrum
playerList = {
  76561198063353595: '198471337734438912',
  76561198233132160: '226333548863291392',
  76561198171588038: '225903411155959819',
  76561198073265867: '280779851181588480',
  76561198236965602: '184295071774932992'
}

client.once('ready', () => {
  console.log('Running!');
  discServer = client.guilds.first();
  server.listen(port, host);
});

client.login(apikey);
