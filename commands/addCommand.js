const Discord = require("discord.js");
const mysql = require('mysql');
let config = require("../botconfig.json");
const errors = require("../utils/errors.js");
const conn = require('../utils/conn.js');
let helpFile = require("../utils/help.json");


module.exports.run = async (bot, message, args, someData) => {
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
  // if (!rUser) return errors.cantfindUser(message.channel);
  // let rreason = args.join(" ").slice(22);
  // if (!rreason) return errors.noReason(message.channel);


  conn.query(`INSERT INTO customCmds (name, content, server_id, details) VALUES ('${newCmdName}', '${newCmdCont2}', '${message.guild.id}', '${message.author.tag}, ${message.author.id}, ${message.createdAt}')`, function(error, results, fields) {
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
    }
  });


}

module.exports.help = {
  name: "addCommand"
}
