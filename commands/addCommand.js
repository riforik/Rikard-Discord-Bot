const Discord = require("discord.js");
const mysql = require('mysql');
let config = require("../botconfig.json");
const errors = require("../utils/errors.js");
const conn = require('../utils/conn.js');
let helpFile = require("../utils/help.json");


module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");
  if (args[0] == "help") {
    message.reply(`${helpFile.addCommand.name} ${helpFile.addCommand.command}`);
    return;
  }

  let cmdParts = message.content.split(" ");
  console.log(cmdParts);

  let newCmdName = cmdParts[1];
  let newCmdCont = cmdParts;

  newCmdCont.shift();
  newCmdCont.shift();

  console.log(newCmdCont);

  console.log(`!${newCmdName} ${newCmdCont.join(" ")}`);
  let newCmdCont2 = newCmdCont.join(" ");


  conn.query(`INSERT INTO customCmds (name, content, server_id, details) VALUES ('${newCmdName}', '${newCmdCont2}', '${message.guild.id}', '${message.author.tag}, ${message.author.id}, ${message.createdAt}')`, function(error, results, fields) {
    if (error) {
      isConnected = false;
      message.reply(`Connection failed`)
    } else {

      let commandembed = new Discord.RichEmbed()
        .setColor(config.green)
        .setTitle(`COMMAND`)
        .addField(`Created By`, `${message.author.tag}`)
        .addField(`Command`, `!${newCmdName} ${newCmdCont.join(" ")}`)
        .addField(`Created At`, `${message.createdAt}`);

      message.reply(commandembed);
      isConnected = true;
    }
  });


}

module.exports.help = {
  name: "addCommand"
}
