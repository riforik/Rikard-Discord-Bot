const http = require('http');
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const cloudCommands = require("./cloudCommands.json");
const tokenfile = require("./token.json");
const fs = require("fs");
const conn = require('./utils/conn.js');
const mysql = require('mysql');
const errorsUtil = require("./utils/errors.js");
let xp = require("./utils/xp.json");
// const express = require('express');
// const app = express();

const layout = require('./page/layout.js');
const port = 3000

const bot = new Discord.Client({
  disableEveryone: true
});

bot.commands = new Discord.Collection();

var isCloudCommands = false;


var server = http.createServer(function(req, res) {

  fs.readFile("./page/layout.html", "UTF-8", function(err, html) {

    res.end(html)
  })

  var message = 'It works!\n',
    version = 'NodeJS ' + process.versions.node + '\n',
    response = `${[message, version].join('\n')}\n${layout}`;

});

server.listen(3001);


let cCmds; // cloud commands variable
let cCmdsTimer, delay = 20000;
cCmdsTimer = setInterval(function() {
  getCloudCommands();
}, delay);

function getCloudCommands() {
  conn.query('SELECT * FROM customCmds', function(error, results, fields) {
    if (error) {
      isCloudCommands = false;
      console.log(`Failed to load cloud commands...`);
    } else {
      console.log(`Cloud commands loaded`);
      console.log('The solution is: ', results[0].solution);
      isCloudCommands = true;
      cCmds = results;
      console.log(cCmds);
    }
  });
}
getCloudCommands();


fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  // find each command in ./commands
  jsfile.forEach((file, i) => {
    let props = require(`./commands/${file}`);
    console.log(`${file} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});


// Bot is ready
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  if (isCloudCommands) {
    bot.user.setActivity(`${botconfig.prefix}help`, {
      type: "WATCHING"
    });
  } else {
    bot.user.setActivity(`Restricted ${botconfig.prefix}`, {
      type: "WATCHING"
    });
  }
});


// Joining member
bot.on('guildMemberAdd', async member => {
  console.log(`${member.id} joined the server...`); // new member

  // Find general channel
  const channel = member.guild.channels.find(ch => ch.name === 'general');

  // No channel? do nothing.
  if (!channel) return;

  // Mention the new member
  channel.send(`Awww shit who is it... It's ${member}`);
});



// Leaving member
bot.on('guildMemberRemove', async member => {
  console.log(`${member.id} left the server...`);

  // Find general channel
  const channel = member.guild.channels.find(ch => ch.name === 'general');

  // No channel? do nothing.
  if (!channel) return;

  // Mention the new member
  channel.send(`Sad to see you go, ${member}`);
});


// New message
bot.on("message", async message => {
  if (message.author.bot) return; // bot speech gets ignored
  if (message.channel.type === "dm") return; // dm speech also ignored

  // commands refute gaining XP
  if (message.content.includes("r!")) {
    console.log("commands don't gain xp");
  } else {
    levelTracker(bot, message, message.author); // run the level tracker
  }

  // log the message details
  console.log(`New Message:\nName: ${message.author.tag} \nUser: ${message.author.id} \nTime: ${message.createdAt} \nCont: ${message.content}`);


  // Variables to make working with commands easier
  let prf = botconfig.prefix; // user chosen prefix (r!)
  let msgArr = message.content.split(" "); // split msg by spaces
  let cmd = msgArr[0]; // grab command from message array
  let args = msgArr.slice(1); // grab argument from message array

  //loop through cloud commands and find match to cmd
  function cloudCommandMatch(array, item) {
    for (var i = 0; i < array.length; i++) {
      if (`${prf}${array[i].name}` === item) {
        return array[i]; // found item
      }
    }
    return false; // Not found
  }

  // if match is made set currentCloudCommand to be used
  //cCmds = remote
  //cloudCommands = local
  let currentCloudCommand = cloudCommandMatch(cloudCommands, cmd);

  // grab needed file
  let commandfile = bot.commands.get(cmd.slice(prefix.length));

  // Run /commands/ file or if command is dynamic use it that way
  if (commandfile) {

    // run commands "normally"
    commandfile.run(bot, message, args);

  } else if (cmd === `
    ${botconfig.prefix}${currentCloudCommand.name}` &&
    message.guild.id === currentCloudCommand.server_id) {
    // run commands differently
    message.delete();

    console.log(currentCloudCommand.name);

    // if content is media or text
    if (currentCloudCommand.content.includes('.png') ||
      currentCloudCommand.content.includes('.jpg') ||
      currentCloudCommand.content.includes('.jpeg') ||
      currentCloudCommand.content.includes('.gif') ||
      currentCloudCommand.content.includes('.mp3') ||
      currentCloudCommand.content.includes('.mp4')) {
      let attachment = new Discord.Attachment(`${currentCloudCommand.content}`);
      message.channel.send(attachment);
      console.log("image attatchment");
    } else {
      message.channel.send(`${currentCloudCommand.content}`);
    }
  };

});

bot.login(tokenfile.token);

// Level Tracker - helper function
function levelTracker(bot, msg, author) {

  // RNG xp value
  let rngXp = Math.floor(Math.random() * 150);
  console.log(">-----=====[ Level Tracker ]=====-----<");
  // console.log("^-----===========================-----^");
  console.log(xp[author.id]);

  // if author has no ID
  if (!xp[author.id]) {
    // author not found
    console.log("no author");
    xp[author.id] = {};
    xp[author.id][msg.guild.id] = {
        xp: 1,
        level: 1,
        msgCount: 1,
        serverID: msg.guild.id
    };

  } else if (!isInGuild(xp[author.id], msg.guild.id)) {
    // author found but not in this server
    console.log("new server");
    xp[author.id][msg.guild.id] = {
        xp: 0,
        level: 1,
        msgCount: 0,
        serverID: msg.guild.id
    };
  }

  console.log(`Author: ${author.username}\nMSG: ${msg}\nLevel: ${xp[author.id].level}\nMsg Count: ${xp[author.id].msgCount}\nCurrent XP: ${xp[author.id].xp}\nRNG XP: ${rngXp}`);

  function isInGuild(array, id){
    if (!array[id]) {
      return false;
    }
    if (array[id].serverID === `${id}`) {
      return true; // Found
    } else {
        return false; // Not found
    }
  };
  // current xp
  let curXp = xp[author.id][msg.guild.id].xp;
  // current level
  let curLvl = xp[author.id][msg.guild.id].level;
  // increasing multiplication each level
  let advLvl = xp[author.id][msg.guild.id].level * 500;
  console.log(advLvl);
  xp[author.id][msg.guild.id].xp = curXp + rngXp;

  xp[author.id][msg.guild.id].msgCount++;

  // level up if current xp is past level expectancy
  if (advLvl <= xp[author.id][msg.guild.id].xp) {
    xp[author.id][msg.guild.id].level = curLvl + 1; // up one level
    msg.reply(`You are now level ${xp[author.id][msg.guild.id].level}`);
  }
  console.log("^-----===========================-----^");

  // update database
  fs.writeFile("./utils/xp.json", JSON.stringify(xp), (err) => {
    if (err) {
      console.log(err);
    }
  });

}; // end of levelTracker();

function exitHandler(options, exitCode) {
  clearInterval(cCmdsTimer);
  if (options.cleanup) console.log('clean');
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) {
    // conn.end();
    process.exit();
  };
} // end of exitHandler();

//do something when app is closing
process.on('exit', exitHandler.bind(null, {
  cleanup: true
}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
  exit: true
}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {
  exit: true
}));
process.on('SIGUSR2', exitHandler.bind(null, {
  exit: true
}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
  exit: true
}));
