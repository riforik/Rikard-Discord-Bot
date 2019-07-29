const Discord = require("discord.js");
const mysql = require('mysql');
let config = require("../botconfig.json");
const errors = require("../utils/errors.js");
const conn = require('../utils/conn.js');
let helpFile = require("../utils/help.json");
const Joi = require('@hapi/joi');
const schema = Joi.object().keys({
  name: Joi.string().min(3).max(150).required(),
  content: Joi.string().required(),
  server_id: Joi.string(),
  details: Joi.string()
}).with('name', 'content');
let values;


module.exports.run = async (bot, message, args, someData) => {
  message.delete();
  console.log(args);
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");
  if (args[0] == "help") {
    message.reply(`${helpFile.addCommand.name} ${helpFile.addCommand.command}`);
    return;
  }

  let cmdParts = message.content.split(" ");
  console.log(cmdParts);

  let newCmdName = args[0];
  let newCmdCont = args[1];

  if (!newCmdName) return errors.noCmd(message.channel, "MANAGE_GUILD");
  if (!newCmdCont) return errors.incorrectUsage(message.channel);


  function validateInput() {
    schema.validate({
      name: `${newCmdName}`,
      content: `${newCmdCont}`,
      server_id: `${message.guild.id}`,
      details: `${message.author.tag}, ${message.author.id}, ${message.createdAt}`
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
validateInput();

  function addNewCommand() {
    return conn('customCmds').insert({
      "name": values.name,
      "content": values.content,
      "server_id": values.server_id,
      "details": values.details
    });
  }

  addNewCommand().then((results, error, fields) => {
    if (error) {
      isConnected = false;
      message.reply(`Connection failed`)
    } else {

      let commandembed = new Discord.RichEmbed()
        .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
        .setColor(config.green)
        .setTitle(`COMMAND`)
        .addField(`Created By`, `${message.author.tag}`)
        .addField(`Command`, `!${newCmdName} ${newCmdCont.join(" ")}`)
        .addField(`Created At`, `${message.createdAt}`);

      // message.reply(`Connection good. ${message.author.username}`)
      message.reply(commandembed);
      isConnected = true;
      return results;
    }
  })

}

module.exports.help = {
  name: "addCommand"
}
