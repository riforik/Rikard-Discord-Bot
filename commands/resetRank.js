const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");
const ranks = require("../utils/ranks.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");
  if (args[0] == "help") {
    message.reply(`${helpFile.resetRank.name} ${helpFile.resetRank.command}`);
    return;
  }

  let gID = message.guild.id;

  if (args[0] == "all") {
    return resetAllRanks(gID, args);
  }

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));


  console.log(rUser.user.username);
  console.log(args);
  console.log(message.channel.name);

  // if any args are incorrect using ||
  if (!rUser) {
    return errors.cantfindUser(message.channel); // no user
  } else {
    resetRank(rUser.user, gID);
  }

  function resetAllRanks(gID, args) {
    let prefix = config.prefix;
    let cmd = "r!rank";

    if (args[1] == gID) {
      let backupCommand = bot.commands.get(cmd.slice(prefix.length));
      if (backupCommand) {
        backupCommand.run(bot, message, "b", false);

        // get all members
        let gSize = message.guild.memberCount;
        let gCount = message.guild.members;
        let gUsrs = Array.from(gCount.values());

        console.log(`${gUsrs[0].user.username}`);
        console.log(`Looping ${gSize} times`);
        // reset all members levels
        for (var i = 0; i < gSize; i++) {

          console.log(`Looped ${i} times ${gUsrs[i].user.id}`);
          if (!xp[gUsrs[i].user.id]) {
            // author not found
            xp[gUsrs[i].user.id] = {};
            xp[gUsrs[i].user.id][gID] = {
              xp: 0,
              level: 0,
              msgCount: 0,
              serverID: gID
            };
          } else if (!isInGuild(xp[gUsrs[i].id], gID)) {
            // author found but not in this server
            console.log("new server");
            xp[gUsrs[i].user.id][gID] = {
              xp: 0,
              level: 0,
              msgCount: 0,
              serverID: gID
            };
          }

          function isInGuild(array, id) {
            if (!array[id]) {
              return false;
            }
            console.log("----------------------");
            console.log(array[id].serverID);
            console.log("----------------------");
            if (array[id].serverID === `${id}`) {
              return true; // Found
            } else {
              return false; // Not found
            }
          };
          // reset rank to
          xp[gUsrs[i].id][gID].xp = 0;
          xp[gUsrs[i].id][gID].level = 0;
          xp[gUsrs[i].id][gID].msgCount = 0;

          fs.writeFile("./utils/xp.json", JSON.stringify(xp), (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

        message.reply("I reset all the ranks, and exported a backup for the ability to sleep at night.")

      }
    } else {
      message.reply("You did not enter the server id confirmation.")
    }
  }

  function resetRank(author, gID) {
    console.log(`resetRank: ${author.username}`);
    if (!xp[author.id]) {
      // author not found
      xp[author.id] = {};
      xp[author.id][gID] = {
        xp: 0,
        level: 0,
        msgCount: 0,
        serverID: gID
      };
    } else if (!isInGuild(xp[author.id], message.guild.id)) {
      // author found but not in this server
      console.log("new server");
      xp[author.id][message.guild.id] = {
        xp: 0,
        level: 0,
        msgCount: 0,
        serverID: message.guild.id
      };
    }

    function isInGuild(array, id) {
      if (!array[id]) {
        return false;
      }
      console.log("----------------------");
      console.log(array[id].serverID);
      console.log("----------------------");
      if (array[id].serverID === `${id}`) {
        return true; // Found
      } else {
        return false; // Not found
      }
    };
    // reset rank to
    xp[author.id][gID].xp = 0;
    xp[author.id][gID].level = 0;
    xp[author.id][gID].msgCount = 0;

    let curXP = xp[author.id][gID].xp;
    let curLvl = xp[author.id][gID].level;
    let curMsg = xp[author.id][gID].msgCount;

    let nxtLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
    let nxtLvlXP = ranks[curLvl + 1].Total_XP;
    let nxtLvlXP_xp = ranks[curLvl + 1].XP;
    let lvlDiff = nxtLvlXP - curXP;

    let percVal = Math.floor((100 * (nxtLvlXP_xp - lvlDiff)) / nxtLvlXP_xp);
    let percValMin = Math.floor((config.rankPercent * (nxtLvlXP_xp - lvlDiff)) / nxtLvlXP_xp);
    let percArr = [percValMin, config.rankPercent - percValMin];
    let percCharArr = [config.rankHasPerc, config.rankNeedsPerc];
    for (var i = 0; i < percArr[0]; i++) {
      percCharArr[0] += config.rankHasPerc;
    }
    for (var i = 0; i < percArr[1]; i++) {
      percCharArr[1] += config.rankNeedsPerc;
    }

    let uIcon = author.displayAvatarURL;
    let bIcon = bot.user.displayAvatarURL;
    let rankEmb = new Discord.RichEmbed()
      .setDescription("Reset Rank")
      .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
      .setTitle(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .addField("Progress", `${percVal}%\r _${percCharArr[0]}${percCharArr[1]}⸽_`)
      .setFooter(`${nxtLvlXP_xp - lvlDiff} out of ${nxtLvlXP_xp}`, bIcon);

    message.reply(rankEmb);

    fs.writeFile("./utils/xp.json", JSON.stringify(xp), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }


}

module.exports.help = {
  name: "resetRank"
}
