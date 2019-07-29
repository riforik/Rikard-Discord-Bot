const Discord = require("discord.js");
const mysql = require('mysql');
const errors = require("../utils/errors.js");
const conn = require('../utils/conn.js');
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
const Joi = require('@hapi/joi');
const schema = Joi.object().keys({
  username: Joi.string().min(3).max(150),
  userID: Joi.string().required(),
  reason: Joi.string(),
  rUsername: Joi.string(),
  rID: Joi.string().required(),
  time: Joi.string()
}).with('userID', 'rID');

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
  let values;

  function validateInput() {
    schema.validate({
      username: `${message.author.tag}`,
      userID: `${message.author.id}`,
      reason: `${rreason}`,
      rUsername: `${rUser.user.username}#${rUser.user.discriminator}`,
      rID: `${rUser.user.id}`,
      time: `${message.createdAt}`
    }, function(err, value) {
      if (err) {
        console.log(err);
        return errors.incorrectUsage(message.channel);
      } else {
        console.log("valid");
        console.log(value);
        values = value;
        return value;
      }
    });
  }

  function newReport() {
    console.log("New Report:");

    return conn('reports').insert({
      "username": values.username,
      "userID": values.userID,
      "reason": values.reason,
      "rUsername": values.rUsername,
      "rID": values.rID,
      "time": values.time
    });

    console.log("- End Report -");
  }

  newReport().then((results, error, fields) => {
    if (error) {
      isConnected = false;
      message.reply(`Connection failed`)
    } else {

      let reportembed = new Discord.RichEmbed()
        .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
        .setColor(config.blue)
        .setTitle(`REPORTED USER`)
        .addField(`Issued By`, `${message.author.tag}`)
        .addField(`Reported`, `${rUser.user.username}#${rUser.user.discriminator}`)
        .addField(`Reason`, `${rreason}`)
        .addField(`Created At`, `${message.createdAt}`);

      message.reply(reportembed).then(msg => msg.delete(5000));
      isConnected = true;
    }
  })
}

module.exports.help = {
  name: "report"
}
