const Discord = require("discord.js");
const mysql = require('mysql');
const errors = require("../utils/errors.js");
const conn = require('../utils/conn.js');
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");


module.exports.run = async (bot, message, args, someData) => {
  message.delete();
  if (args[0] == "help") {
    message.reply(`${helpFile.report.name} ${helpFile.report.command}`);
    return;
  }
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!rUser) return errors.cantfindUser(message.channel);
  let rreason = args.join(" ").slice(22);
  if (!rreason) return errors.noReason(message.channel);


  conn.query(`INSERT INTO reports (username, userID, reason, rUsername, rID, time) VALUES ('${message.author.tag}', ${message.author.id}, '${rreason}','${rUser.user.username}#${rUser.user.discriminator}', ${rUser.user.id}, '${message.createdAt}')`, function(error, results, fields) {
    if (error) {
      isConnected = false;
      message.reply(`Connection failed. ${message.author.username}`).then(msg => msg.delete(3000));
    } else {

      let reportembed = new Discord.RichEmbed()
        .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
        .setColor(config.blue)
        .setTitle(`REPORT`)
        .addField(`Issued By`, `${message.author.tag}`)
        .addField(`Reported`, `${rUser.user.username}#${rUser.user.discriminator}`)
        .addField(`Reason`, `${rreason}`)
        .addField(`Created At`, `${message.createdAt}`);

      // message.reply(`Connection good. ${message.author.username}`)
      message.reply(reportembed).then(msg => msg.delete(5000));
      isConnected = true;
    }
  });


}

module.exports.help = {
  name: "report"
}
