const Discord = require("discord.js")
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!aUser) {
    let embed = new Discord.RichEmbed()
      .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
      .setColor(config.coolblue)
      .setTitle(message.author.username)
      .setImage(message.author.avatarURL)
      .setFooter(message.createdAt);

    return message.channel.send(embed);
  }

  let embed = new Discord.RichEmbed()
    .setAuthor("Riforik", "https://i.imgur.com/4BF1DoJ.png", "https://github.com/riforik")
    .setColor(config.coolblue)
    .setTitle(aUser.user.username)
    .setImage(aUser.user.avatarURL);

  message.channel.send(embed);

}
module.exports.help = {
  name: 'avatar'
}
