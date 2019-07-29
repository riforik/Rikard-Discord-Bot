const Discord = require("discord.js");
const superagent = require("superagent");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let rulesFile = require("../utils/rules.json");
let rulesCont = `
**1. ${rulesFile.beRespectful.name}** ${rulesFile.beRespectful.command}\r
**2. ${rulesFile.contentSharing.name}** ${rulesFile.contentSharing.command}\r
**3. ${rulesFile.largeText.name}** ${rulesFile.largeText.command}\r
**4. ${rulesFile.grammar.name}** ${rulesFile.grammar.command}\r
**5. ${rulesFile.profanity.name}** ${rulesFile.profanity.command}\r
**6. ${rulesFile.mention.name}** ${rulesFile.mention.command}\r
**7. ${rulesFile.links.name}** ${rulesFile.links.command}\r
**8. ${rulesFile.advertising.name}** ${rulesFile.advertising.command}\r
**9. ${rulesFile.voiceChat.name}** ${rulesFile.voiceChat.command}\r`;
let rulesCont2 = `
**10. ${rulesFile.chatUsage.name}** ${rulesFile.chatUsage.command}\r
**11. ${rulesFile.doxing.name}** ${rulesFile.doxing.command}\r
**12. ${rulesFile.nsfw.name}** ${rulesFile.nsfw.command}\r
**13. ${rulesFile.hate.name}** ${rulesFile.hate.command}\r
**14. ${rulesFile.helpSpam.name}** ${rulesFile.helpSpam.command}\r
**15. ${rulesFile.macro.name}** ${rulesFile.macro.command}\r
**16. ${rulesFile.behave.name}** ${rulesFile.behave.command}\r
**17. ${rulesFile.offensiveNames.name}** ${rulesFile.offensiveNames.command}\r
**18. ${rulesFile.outsideBots.name}** ${rulesFile.outsideBots.command}\r`;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");


  let rulesembed = new Discord.RichEmbed()
    .setColor(config.limegreen)
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik/Rikard-Discord-Bot/blob/master/commands/CommandList.md")
    .setTitle(":books: Rules")
    .setDescription("The rules are made so that people can actually enjoy using the server.")
    .addField("**Basics**", rulesCont)
    .addField("**Continued**", rulesCont2)
    .setFooter("End of rules", bot.user.displayAvatarURL);


  let logchannel = message.guild.channels.find(ch => ch.name === 'rules');
  if (!logchannel) return message.member.send(rulesembed);

  message.delete().catch(O_o => {});
  logchannel.send(rulesembed);

  // message.channel.send(rulesembed);
}
module.exports.help = {
  name: 'rules'
}