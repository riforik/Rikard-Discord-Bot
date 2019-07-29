const Discord = require("discord.js");
const superagent = require("superagent");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let moderationCont = `
**${config.prefix}${helpFile.addCommand.name}** ${helpFile.addCommand.command}\r
**${config.prefix}${helpFile.addrole.name}** ${helpFile.addrole.command}\r
**${config.prefix}${helpFile.ban.name}** ${helpFile.ban.command}\r
**${config.prefix}${helpFile.botinfo.name}** ${helpFile.botinfo.command}\r
**${config.prefix}${helpFile.clear.name}** ${helpFile.clear.command}\r
**${config.prefix}${helpFile.createRole.name}** ${helpFile.createRole.command}\r
**${config.prefix}${helpFile.help.name}** ${helpFile.help.command}\r
**${config.prefix}${helpFile.kick.name}** ${helpFile.kick.command}\r
**${config.prefix}${helpFile.nickname.name}** ${helpFile.nickname.command}\r
**${config.prefix}${helpFile.removerole.name}** ${helpFile.removerole.command}\r
**${config.prefix}${helpFile.report.name}** ${helpFile.report.command}\r
**${config.prefix}${helpFile.tempmute.name}** ${helpFile.tempmute.command}\n`;

let generalCont = `
**${config.prefix}${helpFile.actualized.name}** ${helpFile.actualized.command}\r
**${config.prefix}${helpFile.avatar.name}** ${helpFile.avatar.command}\r
**${config.prefix}${helpFile.memberCount.name}** ${helpFile.memberCount.command}\r
**${config.prefix}${helpFile.serverinfo.name}** ${helpFile.serverinfo.command}\n`;

let musicCont = `
**${config.prefix}${helpFile.play.name}** ${helpFile.play.command}\r
**${config.prefix}${helpFile.stop.name}** ${helpFile.stop.command}\n`;

let funCont = `
**${config.prefix}${helpFile.cat.name}** ${helpFile.cat.command}\r
**${config.prefix}${helpFile.doggo.name}** ${helpFile.doggo.command}\n`;

let mathCont = `
**${config.prefix}${helpFile.math.name}** ${helpFile.math.command}\n`;

let lvlSytmCont = `
**${config.prefix}${helpFile.rank.name}** ${helpFile.rank.command}\r
**${config.prefix}${helpFile.resetRank.name}** ${helpFile.resetRank.command}\r
**${config.prefix}${helpFile.restoreRank.name}** ${helpFile.restoreRank.command}\r
**${config.prefix}${helpFile.setRank.name}** ${helpFile.setRank.command}\r
**${config.prefix}${helpFile.addXp.name}** ${helpFile.addXp.command}\r
**${config.prefix}${helpFile.takeXp.name}** ${helpFile.takeXp.command}\n`;

let management = `
**${config.prefix}${helpFile.cmdList.name}** ${helpFile.cmdList.command}\r
**${config.prefix}${helpFile.introduction.name}** ${helpFile.introduction.command}\r
**${config.prefix}${helpFile.rules.name}** ${helpFile.rules.command}\r
**${config.prefix}${helpFile.updates.name}** ${helpFile.updates.command}\r`;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");

  let helpembed = new Discord.RichEmbed()
    .setColor(config.limegreen)
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik/Rikard-Discord-Bot/blob/master/commands/CommandList.md")
    .setTitle(":scroll: Command List")
    .setDescription("Commands and their code can be found on GitHub by clicking the link on Riforiks name")
    .addField(":scales: Moderation", moderationCont)
    .addField(":performing_arts: General", generalCont)
    .addField(":musical_note: Music", musicCont)
    .addField(":joy: Fun", funCont)
    .addField(":straight_ruler: Math", mathCont)
    .addField(":chart_with_upwards_trend: Level System", lvlSytmCont)
    .addField(":control_knobs: Management", management)
    .setFooter("End of commands", bot.user.displayAvatarURL);


  let logchannel = message.guild.channels.find(ch => ch.name === 'commands');
  if (!logchannel) return message.member.send(helpembed);

  message.delete().catch(O_o => {});
  logchannel.send(helpembed);

  // message.channel.send(helpembed);
}
module.exports.help = {
  name: 'commands'
}
