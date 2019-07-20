const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  if (!message.member.hasPermission("KICK_MEMBERS")) return errors.noPerms(message, "KICK_MEMBERS");
  if (args[0] == "help") {
    message.reply(`${helpFile.kick.name} ${helpFile.kick.command}`);
    return;
  }
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!kUser) return errors.cantfindUser(message.channel);
  let kReason = args.join(" ").slice(22);
  if (kUser.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, kUser, "MANAGE_MESSAGES");

  let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor(config.orange)
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

  let kickChannel = message.guild.channels.find(ch => ch.name === 'logs');
  if (!kickChannel) return message.channel.send("Can't find logs channel.").then(msg => msg.delete(3000));

  message.guild.member(kUser).kick(kReason);
  kickChannel.send(kickEmbed).then(msg => msg.delete(3000));
}

module.exports.help = {
  name: "kick"
}
