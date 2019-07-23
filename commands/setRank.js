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
    let helpEmbed = new Discord.RichEmbed()
      .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
      .setTitle("Set Rank")
      .setDescription(`${helpFile.setRank.command}`)
      .setColor(config.limegreen)
      .setURL("https://mee6.github.io/Mee6-documentation/levelxp/")
      .setThumbnail("https://i.imgur.com/4BF1DoJ.png")
      .setFooter("https://docs.google.com/spreadsheets/d/1F4y1qBurAu3l4UfYrgwXFLtojNdtW6qhMInEyrNX_x4/edit#gid=2006768245");

    message.channel.send(helpEmbed).then(msg => msg.delete(30000));
    return;
  }

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let gID = message.guild.id;

  console.log(rUser.user.username);
  console.log(args);
  console.log(message.channel.name);

  if (!rUser) {
    return errors.cantfindUser(message.channel); // no user
  } else if (args[1] === " " || args[2] === " " || args[3] === " ") {
    return errors.incorrectUsage(message.channel); // bad usage
  } else if (args[1] && !args[2]) {
    setRank(rUser.user, gID, args[1], true);
  } else {
    setRank(rUser.user, gID, false);
  }

  function isPosNum(num) {
    return !isNaN(num) && num > 0;
  }

  function setRank(author, gID, dLvl, zoolean) {
    if (isPosNum(dLvl)) {
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

      xp[author.id][gID].xp = ranks[dLvl].Total_XP;
      xp[author.id][gID].level = ranks[dLvl].Level;
      xp[author.id][gID].msgCount = Math.floor(ranks[dLvl].Avg_Minutes);
      console.log(ranks[dLvl].XP);
      console.log(`---=======[]=======---`);
    } else {
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
    }

    let curXP = xp[author.id][gID].xp;
    let curLvl = xp[author.id][gID].level;
    let curMsg = xp[author.id][gID].msgCount;

    let nxtLvl = 5 * (curLvl ^ 2) + 50 * curLvl + 100;
    let nxtLvlXP = ranks[curLvl + 1].Total_XP;
    let nxtLvlXP_xp = ranks[curLvl + 1].XP;
    let lvlDiff = nxtLvlXP - curXP;
    // difference /
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
      .setDescription("Set Rank")
      .setAuthor(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .addField("Progress", `${percVal}%\r _${percCharArr[0]}${percCharArr[1]}⸽_`)
      .setFooter(`${nxtLvlXP_xp - lvlDiff} out of ${nxtLvlXP_xp}`, bIcon);

    message.reply(rankEmb);

    if (nxtLvlXP <= xp[author.id][gID].xp) {
      xp[author.id][gID].level = curLvl + 1; // up one level
      msg.reply(`You are now level ${xp[author.id][gID].level}`);
    }

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
