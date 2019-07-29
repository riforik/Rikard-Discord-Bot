// Constants required
const http = require('http');
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const cloudCommands = require("./cloudCommands.json");
const tokenfile = require("./token.json");
const fs = require("fs");
const conn = require('./utils/conn.js');
const connPool = require('./utils/connPool.js');
const mysql = require('mysql');
const errorsUtil = require("./utils/errors.js");
const Joi = require('@hapi/joi');
const knex = require('knex')({
  client: 'mysql',
  log: {
    warn(message) {},
    error(message) {},
    deprecate(message) {},
    debug(message) {},
  }
});
const schema = Joi.object().keys({
  userInput: Joi.string().optional().allow('')
});
let values;
//.regex(/^[a-zA-Z0-9\0.<->@](?:[^\(\,\)\,bot\,client\,]*)|[0-9\<\-\>\@](?:[^\(\,\)\,bot\,client\,]*)$/)

// Other required variables
let xp = require("./utils/xp.json"); // xp user data
const ranks = require("./utils/ranksPart.json"); // rank list data
const talkedRecently = new Set(); // timeout user speech
let timeOutUsr = []; // array for timed out users

let upTimer = new Date(); // bot start time

// const express = require('express');
// const app = express();
const layout = require('./page/layout.js');
const port = 3000;

// Bot Client
const bot = new Discord.Client({
  disableEveryone: true
});

// Command collection
bot.commands = new Discord.Collection();

var isConnected = false; // main levels connection status
var isCloudCommands = false; // custom commands connection status
var someData = 0; // main levels data holder

// create homepage on server for bot
var server = http.createServer(function(req, res) {
  fs.readFile("./page/layout.html", "UTF-8", function(err, html) {
    res.end(html)
  });
  var message = 'It works!\n',
    version = 'NodeJS ' + process.versions.node + '\n',
    response = `${[message, version].join('\n')}\n${layout}`;
});
server.listen(3001); // on port 3001, exist


// Grab Main Level Data
function getAllPosts() {
  return connPool('mainLevels').select("*").then(data => {
    isConnected = true;
    someData = data;
    return data;
  })
}

// Log main levels data
getAllPosts().then(data => {
  console.log(">----------=====[Main Levels]=====----------<");
  console.log(JSON.stringify(data))
  console.log(">-------=============================-------<");
})


let cCmds; // cloud commands variable
let cCmdsTimer, delay = 20000;
// check for new db entries every (delay) miliseconds
// cCmdsTimer = setInterval(function() {
//   getCloudCommands(); // recall database
// }, delay);

// Return custom commands database
function getCloudCommands() {
  return connPool('customCmds').select("*").then(data => {
    isCloudCommands = true; // cloud commands loaded
    cCmds = data; // fill cloud commands array with data from db
    return data; // return data if function is calledback
  })
}

// Find Server's Cloud Commands
getCloudCommands().then(data => {
  console.log(">----------=====[Cloud Commands]=====----------<");
  for (var i = 0; i < data.length; i++) {
    if (data[i].server_id === botconfig.rikSupServId) {
      console.log(JSON.stringify(data[i]));
    }
  }
  console.log(">-------================================-------<");
})

// Read commands folder
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  // find each commands
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);

    console.log(`${f} loaded!`);

    bot.commands.set(props.help.name, props);
  });
});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  if (isConnected) {
    bot.user.setActivity(`${botconfig.prefix}help`, {
      type: "WATCHING"
    });
  } else {
    bot.user.setActivity(`Restricted ${botconfig.prefix}`, {
      type: "WATCHING"
    });
  }

  // var guildx = bot.guilds.find("id", botconfig.rikSupServId); //Test serverID
  var guildx = bot.guilds.find(guilds => guilds.id === botconfig.rikSupServId);
  // await guildx.channels.find("id", botconfig.rikSupIntroChID).fetchMessages({limit: 2})
  await guildx.channels.find(channels => channels.id === botconfig.rikSupRulesChID).fetchMessages({
    limit: 10
  })

});

bot.on('messageReactionAdd', (reaction, user) => {

  if (reaction.emoji.name === "✅" && reaction.message.id == "603716968566095904") {
    let rMem = reaction.message.guild.members.find(members => members.id === user.id);
    let gRole = reaction.message.guild.roles.find(roles => roles.name === "New");

    if (rMem.roles.has(gRole.id)) {
      console.log("already as role")
    };
    rMem.addRole(gRole.id);
  }
});

// Create an event for new guild members
bot.on('guildMemberAdd', async member => {
  console.log(`${member.id} joined the server...`);
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Awww shit who is it... It's ${member}`);
});



// Create an event for leaving guild members
bot.on('guildMemberRemove', async member => {
  console.log(`${member.id} left the server...`);
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Sad to see you go, ${member}`);
});



bot.on("message", async message => {
  // Message Variables
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // let validateArgs = message.content;
  let validateArgs = message.content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let validateArgsArr = validateArgs.split(" ").slice(1);

  console.log(args);  // raw input
  console.log(validateArgs); // prepared input
  console.log(validateArgsArr); // prepared input array

  // Validate User Input
  schema.validate({
    userInput: `${validateArgs}`
  }, function(err, value) {
    if (err) {
      console.log(err);
      return errorsUtil.incorrectUsage(message.channel);
    } else {
      // console.log("valid");
      // console.log(value);
      values = value;

      var pingTimer = Date.now(); // message input recieved
      if (message.author.bot) return; // no bots
      if (message.channel.type === "dm") return; // no dms

      // if command, don't track XP
      if (message.content.includes("r!")) {
        console.log("commands don't gain xp");
      } else {
        let newUsr = {};
        newUsr[message.author.id] = {
          id: message.author.id,
          serverid: message.guild.id,
          dtag: message.author.tag
        }
        // let xpcommandfile = bot.commands.get("giveXP");
        // && newUsr[message.author.id].serverid === message.guild.id
        // console.log(talkedRecently);
        // console.log(talkedRecently[message.author.id]);
        let talkedArr = Array.from(talkedRecently.values())
        // console.log(talkedArr);
        // console.log(talkedArr[message.author.id]);

        if (findSetUser(talkedArr, newUsr)) {
          console.log(`already timed out ${message.author.tag} on ${message.guild.name}`);
          return;
        } else {
          levelTracker(bot, message, message.author); // run the level tracker

          // Adds the user to the set so that they can't talk for a minute
          timeOutUsr.push(newUsr);
          // console.log(timeOutUsr);
          console.log("timing out");
          // find user loop

          talkedRecently.add(newUsr);
          setTimeout(() => {
            // Removes the user from the set after a minute
            // message.channel.send(`TIME's Up. - ${message.author}`);
            console.log(`TIME's Up for ${message.author.tag} on ${message.guild.name}`);
            talkedRecently.delete(newUsr);
          }, 60000);
        }

        function findSetUser(array, item) {
          for (var i = 0; i < array.length; i++) {
            if (array[i][message.author.id].serverid === message.guild.id) {
              return array[i]; // Found it
            } else {
              return false;
            }
          }
          return false; // Not found
        }
      }

      function isItemInArray(array, item) {
        for (var i = 0; i < array.length; i++) {
          if (array[i].dTag === message.author.tag) {
            console.log(`Item: ${array[i].dTag}`);
            return array[i]; // Found it
          }
        }
        return false; // Not found
      }
      // curUsr = function output
      let curUsr = isItemInArray(someData, message.author);
      console.log(curUsr);

      // log the message details
      console.log(`New Message:\nName: ${message.author.tag} \nUser: ${message.author.id} \nTime: ${message.createdAt} \nCont: ${message.content}`);


      //loop through cloud commands and find match to cmd
      function cloudCommandMatch(array, item) {
        for (var i = 0; i < array.length; i++) {
          if (`${botconfig.prefix}${array[i].name}` === item) {
            return array[i]; // found
          }
        }
        return false; // Not found
      }

      // if match is made set currentCloudCommand to be used
      //cCmds = remote, cloudCommands = local
      // search database for command
      let currentCloudCommand = cloudCommandMatch(cloudCommands, cmd);

      // grab needed file
      let commandfile = bot.commands.get(cmd.slice(prefix.length));

      // run command file with arguments
      if (commandfile) {
        commandfile.run(bot, message, validateArgsArr, someData, pingTimer, upTimer, args);
      } else if (cmd === `${botconfig.prefix}${currentCloudCommand.name}` && message.guild.id === currentCloudCommand.server_id) {
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


      // If the server is not equal to main server id (Rikard Support Server)
      if (message.guild.id === botconfig.rikSupServId) {

        // If user was given a role Member, on chat check if they have New so that it can be removed
        let mMem = message.guild.members.find(members => members.id === message.author.id);
        let mRole = message.guild.roles.find(roles => roles.name === "Member"); // given at level 3
        let mRoleR = message.guild.roles.find(roles => roles.name === "New"); // given after rules acceptance

        if (mMem.roles.has(mRole.id)) {
          mMem.removeRole(mRoleR.id);
        };
      } else {
        return;
      }
    }
  });

});

bot.login(tokenfile.token);


function levelTracker(bot, msg, author) {

  let rngXp = Math.floor(Math.random() * botconfig.rngAmnt); // rng xp

  // fix if less than 15
  if (rngXp < 15) {
    rngXp = 20;
  }
  console.log(">-----=====[ Level Tracker ]=====-----<");

  // if author has no ID
  if (!xp[author.id]) {
    // author not found
    console.log("no author");
    xp[author.id] = {};
    xp[author.id][msg.guild.id] = {
      xp: 0,
      level: 0,
      msgCount: 0,
      serverID: msg.guild.id
    };

  } else if (!isInGuild(xp[author.id], msg.guild.id)) {
    // author found but not in this server
    console.log("new server");
    xp[author.id][msg.guild.id] = {
      xp: 0,
      level: 0,
      msgCount: 0,
      serverID: msg.guild.id
    };
  }

  // log some level user data
  console.log(`Author: ${author.username}\nMSG: ${msg}\nLevel: ${xp[author.id].level}\nMsg Count: ${xp[author.id].msgCount}\nCurrent XP: ${xp[author.id].xp}\nRNG XP: ${rngXp}`);

  // find user in xp log
  function isInGuild(array, id) {
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
  let advLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
  // nxtLvl
  let nxtLvl = ranks[curLvl + 1].Total_XP;

  xp[author.id][msg.guild.id].xp = curXp + rngXp;

  xp[author.id][msg.guild.id].msgCount++;

  // level up if current xp is past level expectancy
  if (nxtLvl <= xp[author.id][msg.guild.id].xp) {
    // if (xp[author.id].level >= 999) return;
    if (xp[author.id][msg.guild.id].level >= 999) return;

    xp[author.id][msg.guild.id].level = curLvl + 1; // up one level

    msg.reply(`You are now level ${xp[author.id][msg.guild.id].level}`);

    let prefix = botconfig.prefix;
    let theCmd = "r!roleReward";
    let gRole = msg.guild.roles.find(roles => roles.name === "Member");

    // Level 1 reward
    if (xp[author.id][msg.guild.id].level === 1 && msg.guild.id === botconfig.rikSupServId) {
      let addRoleCmd = bot.commands.get(theCmd.slice(prefix.length));
      if (addRoleCmd) {
        addRoleCmd.run(bot, msg, [author.id, "New"], true);
        msg.channel.send("You should have been given the New role :)")
      }
    }
    // Level 3 reward
    if (xp[author.id][msg.guild.id].level === 3 && msg.guild.id === botconfig.rikSupServId) {
      let addRoleCmd = bot.commands.get(theCmd.slice(prefix.length));
      if (addRoleCmd) {
        addRoleCmd.run(bot, msg, [author.id, "Member"], true);
        msg.channel.send("You should have been given the Member role :)")
      }
    }
    if (xp[author.id][msg.guild.id].level === 999 && msg.guild.id === botconfig.rikSupServId) {
      let addRoleCmd = bot.commands.get(theCmd.slice(prefix.length));
      if (addRoleCmd) {
        addRoleCmd.run(bot, msg, [author.id, "９９９"], true);
        msg.channel.send("You should have been given the ９９９ role :)")
      }
    }

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
