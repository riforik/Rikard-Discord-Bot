const Discord = require("discord.js");
const superagent = require("superagent");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let welcome = `
**Rikard Bot** Rikard Bot serves as a personal Discord bot that provides custom commands relative to the creators needs. An open sourced project where anyone can enhance/fix or modify the code. Creating your own bot off of Rikard is simple as following the GitHub instructions and changing the prefix _(and other config)_ files to match your tone. **If this part's confusing, ask for help in the support channel**`;

let chatting = `
**Enjoying chat** means being nice and following the rules, if you have a problem with someone and can't resolve the discussion feel free to get a staff member involved. There are few rules so this should happen rarely but keeping a rather peaceful chat will always be the best route in the name of conversing.`;

let support = `
**The support channel** is checked often by staff with notifications enabled for mentions and the thought of continuous ongoing chat needing attention to. If you have an improvement use the suggestions channel`;

module.exports.run = async (bot, message, args) => {
  message.delete();
  if (!message.member.hasPermission("MANAGE_GUILD")) return errors.noPerms(message, "MANAGE_GUILD");

  let helpembed = new Discord.RichEmbed()
    .setColor(config.limegreen)
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik/Rikard-Discord-Bot/blob/master/commands/README.md")
    .setTitle("Welcome to the **Rikard Bot Support Server**")
    .setDescription("Ask for help or talk to users in the designated chats.")
    .addField(":door: Introduction", welcome)
    .addField(":speech_left: Conversation", chatting)
    .addField(":helmet_with_cross: Support", support)
    .setFooter("Welcome to the server - Rikard", bot.user.displayAvatarURL);


  let logchannel = message.guild.channels.find(ch => ch.name === 'introduction');
  if (!logchannel) return message.member.send(helpembed);

  message.delete().catch(O_o => {});
  logchannel.send(helpembed);

  // message.channel.send(helpembed);
}
module.exports.help = {
  name: 'intro'
}