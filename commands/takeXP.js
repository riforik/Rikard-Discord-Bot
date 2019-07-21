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
    message.reply(`${helpFile.takeXp.name} ${helpFile.takeXp.command}`);
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
  } else if (args[1] === " ") {
    return errors.incorrectUsage(message.channel); // bad usage
  } else if (rUser.id === bot.user.id){
    return errors.botuser(message);
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
    }
    // change rank to
    let newXP = parseInt(args[1]);

    xp[author.id][gID].xp = xp[author.id][gID].xp - newXP;

    let curXP = xp[author.id][gID].xp;
    let curLvl = xp[author.id][gID].level;
    let curMsg = xp[author.id][gID].msgCount;

    let nxtLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
    let nxtLvlXP = ranks[curLvl + 1].Total_XP;
    let lvlDiff = nxtLvlXP - curXP;

    let uIcon = author.displayAvatarURL;
    let bIcon = bot.user.displayAvatarURL;
    let xpEmbed = new Discord.RichEmbed()
      .setDescription("Take XP")
      .setAuthor(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Done!", `Took ${newXP}XP!`, true)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .setFooter(`${lvlDiff} until next level`, bIcon);

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
