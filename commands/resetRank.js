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

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let gID = message.guild.id;

  console.log(rUser.user.username);
  console.log(args);
  console.log(message.channel.name);

  // if any args are incorrect using ||
  if (!rUser) {
    return errors.cantfindUser(message.channel); // no user
  } else if (rUser.id === bot.user.id){
    return errors.botuser(message);
  } else {
    resetRank(rUser.user, gID);
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
    }
    // reset rank to
    xp[author.id][gID].xp = 0;
    xp[author.id][gID].level = 0;
    xp[author.id][gID].msgCount = 0;

    let curXP = xp[author.id][gID].xp;
    let curLvl = xp[author.id][gID].level;
    let curMsg = xp[author.id][gID].msgCount;

    let nxtLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
    let nxtLvlXP = ranks[curLvl + 1].Total_XP;
    let lvlDiff = nxtLvlXP - curXP;

    let uIcon = author.displayAvatarURL;
    let bIcon = bot.user.displayAvatarURL;
    let rankEmb = new Discord.RichEmbed()
      .setDescription("Reset Rank")
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
  name: "resetRank"
}
