const Discord = require("discord.js");
const superagent = require("superagent");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  //${config.prefix}report @ned this is the reason

  let helpembed = new Discord.RichEmbed()
    .setColor(config.limegreen)
    .setTitle(`Help :mag:`)
    .addField(`${config.prefix}${helpFile.help.name}`, `${helpFile.help.command}`)
    .addField(`${config.prefix}${helpFile.addCommand.name}`, `${helpFile.addCommand.command}`)
    .addField(`${config.prefix}${helpFile.actualized.name}`, `${helpFile.actualized.command}`)
    .addField(`${config.prefix}${helpFile.addrole.name}`, `${helpFile.addrole.command}`)
    .addField(`${config.prefix}${helpFile.avatar.name}`, `${helpFile.avatar.command}`)
    .addField(`${config.prefix}${helpFile.ban.name}`, `${helpFile.ban.command}`)
    .addField(`${config.prefix}${helpFile.botinfo.name}`, `${helpFile.botinfo.command}`)
    .addField(`${config.prefix}${helpFile.cat.name}`, `${helpFile.cat.command}`)
    .addField(`${config.prefix}${helpFile.clear.name}`, `${helpFile.clear.command}`)
    .addField(`${config.prefix}${helpFile.doggo.name}`, `${helpFile.doggo.command}`)
    .addField(`${config.prefix}${helpFile.kick.name}`, `${helpFile.kick.command}`)
    .addField(`${config.prefix}${helpFile.memberCount.name}`, `${helpFile.memberCount.command}`)
    .addField(`${config.prefix}${helpFile.nickname.name}`, `${helpFile.nickname.command}`)
    .addField(`${config.prefix}${helpFile.rank.name}`, `${helpFile.rank.command}`)
    .addField(`${config.prefix}${helpFile.removerole.name}`, `${helpFile.removerole.command}`)
    .addField(`${config.prefix}${helpFile.report.name}`, `${helpFile.report.command}`)
    .addField(`${config.prefix}${helpFile.say.name}`, `${helpFile.say.command}`)
    .addField(`${config.prefix}${helpFile.serverinfo.name}`, `${helpFile.serverinfo.command}`)
    .addField(`${config.prefix}${helpFile.tempmute.name}`, `${helpFile.tempmute.command}`)

  let logchannel = message.guild.channels.find(ch => ch.name === 'logs');
  if (!logchannel) return message.member.send(helpembed);

  message.delete().catch(O_o => {});
  logchannel.send(helpembed);

  // message.channel.send(helpembed);
}
module.exports.help = {
  name: 'help'
}
