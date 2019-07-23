const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");
const ranks = require("../utils/ranksPart.json");
const fs = require("fs");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

module.exports.run = async (bot, message, args, zoolean) => {
  console.log(zoolean);
  message.delete();
  if (args[0] == "help") {
    message.reply(`${helpFile.rank.name} ${helpFile.rank.command}`);
    return;
  }

  let gMemSID = [];

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  let gID = message.guild.id;

  if (isPosNum(args[0])) {
    uRankInfo(message.author, args[0]);
  } else if (args[0] === "b") {
    uRankBackup(message.author, gID);
  } else if (!rUser) {
    uRank(message.author, gID);
  } else {
    uRank(rUser.user, gID);
  }

  // positive number as level
  function isPosNum(num) {
    return !isNaN(num) && num > 0;
  }

  // Rank based on author ID
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
    let lvlEmbed = new Discord.RichEmbed()
      .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
      .setDescription("Level")
      .setTitle(author.username)
      .setColor(config.limegreen)
      .setThumbnail(uIcon)
      .addField("Level", curLvl, true)
      .addField("XP", curXP, true)
      .addField("Msg Count", curMsg)
      .addField("Progress", `${percVal}%\r _${percCharArr[0]}${percCharArr[1]}⸽_`)
      .setFooter(`${nxtLvlXP_xp - lvlDiff} out of ${nxtLvlXP_xp}`, bIcon);

    message.reply(lvlEmbed);
    fs.writeFile("./utils/xp.json", JSON.stringify(xp), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  // Rank based on level input
  function uRankInfo(author, lvl) {
    let nxtLvl = ranks[lvl];
    let uRankIcon = author.displayAvatarURL;
    let bRankIcon = bot.user.displayAvatarURL;
    let uRankEmbed = new Discord.RichEmbed()
      .setDescription("Level")
      .setAuthor(author.username, uRankIcon)
      .setColor(config.limegreen)
      .setThumbnail(bRankIcon)
      .addField("Level", lvl, true)
      .addField("Total XP", `${ranks[lvl].Total_XP} Total XP`)
      .addField("XP", `${ranks[lvl].XP} XP from previous level`)
      .addField("Average Days", `${ranks[lvl].Average_Days} days on average to get here.`)
      .setFooter(`O_o... How many days?`, bRankIcon);

    message.channel.send(uRankEmbed);
  };

  function uRankBackup(author, gID) {
    // let rankArr = Array.from(xp.values());
    let gSize = message.guild.memberCount;
    let gCount = message.guild.members;
    let gUsrs = Array.from(gCount.values());

    // find users with matching server ID
    function isItemInArray(array) {
      for (var i = 0; i < array.length; i++) {

        // if user is in the guild
        if (array[i].guild.id === gID) {

          // if user has no xp record make one
          if (!xp[array[i].user.id]) {
            console.log(`Null here: ${xp[array[i].user.id]}`);
            xp[array[i].user.id] = {};
            xp[array[i].user.id][gID] = {
              xp: 0,
              level: 0,
              msgCount: 0,
              serverID: message.guild.id
            };

            let newEID = array[i].user.id;
            let newEntry = {};
            newEntry[newEID] = xp[array[i].user.id]
            gMemSID.push(newEntry); // add to array
          } else {
            // if user has an xp record
            let newEID = array[i].user.id;
            let newEntry = {};
            let currUsrArr = xp[array[i].user.id];

            // search Array
            if (currUsrArr[gID]) {
              newEntry[newEID] = currUsrArr[gID];
              gMemSID.push(newEntry); // add to array
            } else {
              console.log("Ranks not for your guild");
            }

          }

        } else {
          console.log(`Not: ${array[i].user.id}`);
        }
      }
      // turn to json export
      exportToJsonFile(gMemSID, gUsrs);


      // return false; // Not found
    }
    isItemInArray(gUsrs);

    function exportToJsonFile(jsonData, arr) {
      let dataStr = JSON.stringify(jsonData);
      let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      let betterDate = `${days[message.createdAt.getDay()]} ${months[message.createdAt.getMonth()]} ${message.createdAt.getFullYear()}`;

      let exportFileDefaultName = betterDate.split(" ").join("_");

      // take name arg, if empty use default name
      // make actual file
      if (zoolean) {
        console.log(zoolean);
        fs.writeFile(`./utils/rankBackups/${message.guild.id}_${exportFileDefaultName}_restore.json`, dataStr, (err) => {
          if (err) {
            console.log(err);
          }
        });

        let attachment = new Discord.Attachment(`./utils/rankBackups/${message.guild.id}_${exportFileDefaultName}_restore.json`);
        message.channel.send(attachment);


        let embed = new Discord.RichEmbed()
          .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
          .setTitle("Backup Ranks")
          .setDescription("Creating a backup of your servers ranks")
          .setImage(message.guild.iconURL)
          .setColor(config.green)
          .setURL("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.1.1")
          .setThumbnail(message.guild.iconURL)
          .addField(`${message.guild.name}`, "```json\n" + dataStr + "\n```")
          .addField("Created On", betterDate)
          .setFooter(`${message.guild.id}_${exportFileDefaultName}_restore.json`, message.guild.iconURL);

        message.channel.send(embed);
      } else {
        console.log(zoolean);
        fs.writeFile(`./utils/rankBackups/${message.guild.id}_${exportFileDefaultName}.json`, dataStr, (err) => {
          if (err) {
            console.log(err);
          }
        });

        let attachment = new Discord.Attachment(`./utils/rankBackups/${message.guild.id}_${exportFileDefaultName}.json`);
        message.channel.send(attachment);


        let embed = new Discord.RichEmbed()
          .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
          .setTitle("Backup Ranks")
          .setDescription("Creating a backup of your servers ranks")
          .setImage(message.guild.iconURL)
          .setColor(config.green)
          .setURL("https://github.com/riforik/Rikard-Discord-Bot/releases/tag/v1.1.1")
          .setThumbnail(message.guild.iconURL)
          .addField(`${message.guild.name}`, "```json\n" + dataStr + "\n```")
          .addField("Created On", betterDate)
          .setFooter(`${message.guild.id}_${exportFileDefaultName}.json`, message.guild.iconURL);

        message.channel.send(embed);
      }


      console.log(message.createdAt);


    }

  }
}

module.exports.help = {
  name: "rank"
}
