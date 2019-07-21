const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");
const ranks = require("../utils/ranks.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let gID = message.guild.id;

  if (!rUser) {
    uRank(message.author, gID);
  } else {
    uRank(rUser.user, gID);
  }

  function uRank(author, gID) {
    console.log(`Rank: ${author.username}`);
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

    let curXP = xp[author.id][gID].xp;
    let curLvl = xp[author.id][gID].level;
    let curMsg = xp[author.id][gID].msgCount;
    let nxtLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
    let nxtLvlXP = ranks[curLvl + 1].Total_XP;
    let lvlDiff = nxtLvlXP - curXP;

    let uIcon = author.displayAvatarURL;
    let bIcon = bot.user.displayAvatarURL;
    let lvlEmbed = new Discord.RichEmbed()
      .setDescription("Level")
      .setAuthor(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .setFooter(`${lvlDiff} until next level`, bIcon);

    message.reply(lvlEmbed);
  }
}

module.exports.help = {
  name: "rank"
}
