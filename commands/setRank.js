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
    message.reply(`${helpFile.setRank.name} ${helpFile.setRank.command}`);
    return;
  }

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let gID = message.guild.id;

  console.log(rUser.user.username);
  console.log(args);
  console.log(message.channel.name);

  // if any args are incorrect using ||
  if (!rUser) {
    return errors.cantfindUser(message.channel); // no user
  } else if (args[1] === " " || args[2] === " " || args[3] === " ") {
    return errors.incorrectUsage(message.channel); // bad usage
  } else if (rUser.id === bot.user.id){
    return errors.botuser(message);
  } else {
    setRank(rUser.user, gID);
  }

  function setRank(author, gID) {
    console.log(`setRank: ${author.username}`);
    if (!xp[author.id]) {
      // author not found
      xp[author.id] = {};
      xp[author.id][gID] = {
        xp: 0,
        level: 0,
        msgCount: 0,
        serverID: gID
      };
    }
    // change rank to
    let newXP = parseInt(args[1]);
    let newLvl = parseInt(args[2]);
    let newMsg = parseInt(args[3]);

    xp[author.id][gID].xp = newXP;
    xp[author.id][gID].level = newLvl;
    xp[author.id][gID].msgCount = newMsg;

    let curXP = xp[author.id][gID].xp;
    let curLvl = xp[author.id][gID].level;
    let curMsg = xp[author.id][gID].msgCount;

    let nxtLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
    let nxtLvlXP = ranks[curLvl + 1].Total_XP;
    let lvlDiff = nxtLvlXP - curXP;

    let uIcon = author.displayAvatarURL;
    let bIcon = bot.user.displayAvatarURL;
    let rankEmb = new Discord.RichEmbed()
      .setDescription("Set Rank")
      .setAuthor(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .setFooter(`${lvlDiff} until next level`, bIcon);

    message.reply(rankEmb);

    fs.writeFile("./utils/xp.json", JSON.stringify(xp), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports.help = {
  name: "setRank"
}
