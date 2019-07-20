const Discord = require("discord.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  if (!xp[message.author.id]) {
    // author not found
    xp[message.author.id][message.guild.id] = {
      xp: 0,
      level: 1,
      msgCount: 0,
      serverID: message.guild.id
    };
  }

  let currXP = xp[message.author.id][message.guild.id].xp;
  let currLvl = xp[message.author.id][message.guild.id].level;
  let currMsg = xp[message.author.id][message.guild.id].msgCount;
  let nxtLvl = currLvl * 500;
  let lvlDiff = nxtLvl - currXP;

  let uIcon = message.author.displayAvatarURL;
  let bIcon = bot.user.displayAvatarURL;
  let lvlEmbed = new Discord.RichEmbed()
    .setDescription("Level")
    .setAuthor(message.author.username)
    .setColor(config.limegreen)
    .setThumbnail(uIcon)
    .addField("Level", currLvl, true)
    .addField("XP", currXP, true)
    .addField("Msg Count", currMsg)
    .setFooter(`${lvlDiff} until next level`, bIcon);

  message.reply(lvlEmbed);

}

module.exports.help = {
  name: "rank"
}
