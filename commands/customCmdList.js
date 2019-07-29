const Discord = require("discord.js");
const mysql = require('mysql');
let config = require("../botconfig.json");
const errors = require("../utils/errors.js");
const conn = require('../utils/conn.js');
let helpFile = require("../utils/help.json");


module.exports.run = async (bot, message, args, someData) => {
  message.delete();
  if (!message.member.hasPermission("SEND_MESSAGES")) return errors.noPerms(message, "SEND_MESSAGES");

  function getAllPosts() {
    return conn('customCmds').select("*").then(data => {
      isConnected = true;
      someData = data;
      return data;
    })
  }

  getAllPosts().then(data => {
    console.log(">----------=====[Custom Command List]=====----------<");
    console.log(JSON.stringify(data))

    let commandembed = new Discord.RichEmbed()
      .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
      .setColor(config.green)
      .setTitle(`COMMAND`)
      .addField(`Created By`, `${message.author.tag}`);

      for (var i = 0; i < data.length; i++) {
        if (data[i].server_id === message.guild.id) {
          console.log(JSON.stringify(data[i]));
          commandembed.addField(`**r!${data[i].name}**`, `r!${data[i].name} ${data[i].content}`);
        }
      }

      commandembed.setFooter(`Created At ${message.createdAt}`);

    message.reply(commandembed);
    console.log(">-------=====================================-------<");
  })


}

module.exports.help = {
  name: "customCmds"
}
