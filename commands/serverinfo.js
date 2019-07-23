const Discord = require("discord.js")
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
    .setTitle("Server Information")
    .setColor(config.blue)
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);
  return message.channel.send(serverembed);
}
module.exports.help = {
  name: 'serverinfo'
}
