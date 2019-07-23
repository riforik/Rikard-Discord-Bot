const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");
const ranks = require("../utils/ranksPart.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");
  if (args[0] == "help") {
    message.reply(`${helpFile.takeXp.name} ${helpFile.takeXp.command}`);
    return;
  }

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let gID = message.guild.id;

  console.log(rUser.user.username);
  console.log(args);
  console.log(message.channel.name);

  if (!rUser) {
    return errors.cantfindUser(message.channel); // no user
  } else if (args[1] === " ") {
    return errors.incorrectUsage(message.channel); // bad usage
  } else {
    takeXp(rUser.user, gID);
  }

  function takeXp(author, gID) {
    console.log(`takeXp: ${author.username}`);
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

    // change rank to
    let newXP = parseInt(args[1]);

    xp[author.id][gID].xp = xp[author.id][gID].xp - newXP;

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
    let xpEmbed = new Discord.RichEmbed()
      .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
      .setDescription("Take XP")
      .setTitle(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Done!", `Took ${newXP}XP!`, true)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .addField("Progress", `${percVal}%\r _${percCharArr[0]}${percCharArr[1]}⸽_`)
      .setFooter(`${nxtLvlXP_xp - lvlDiff} out of ${nxtLvlXP_xp}`, bIcon);

    message.reply(xpEmbed);

    fs.writeFile("./utils/xp.json", JSON.stringify(xp), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports.help = {
  name: "takeXp"
}
