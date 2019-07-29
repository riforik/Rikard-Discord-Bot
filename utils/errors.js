const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

module.exports.noPerms = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("Insufficient Permission")
    .setColor(config.red)
    .addField("Permission needed", perm);

  message.channel.send(embed).then(m => m.delete(5000));
}
module.exports.noCmd = (message, perm) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("No Command")
    .setColor(config.red)
    .addField("Permission needed", perm);

  message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, perms) => {

  let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(config.red)
    .setTitle("Error")
    .addField(`${user} has perms`, perms);

  message.channel.send(embed).then(m => m.delete(5000));

}

module.exports.botuser = (message) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Rikard is invincible...")
    .setColor(config.red);

  message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (channel) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Couldn't find that user.")
    .setColor(config.red);

  channel.send(embed).then(m => m.delete(5000));
}
module.exports.cantfindCommand = (channel) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Couldn't find the command, use help.")
    .setColor(config.red);

  channel.send(embed).then(m => m.delete(5000));
}
module.exports.incorrectUsage = (channel) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("You are using the command incorrectly, use help.")
    .setColor(config.red);

  channel.send(embed).then(m => m.delete(5000));
}
module.exports.musicNoChannel = (channel) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("You must be in a voice channel to use music commands.")
    .setColor(config.red);

  channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (channel) => {
  let embed = new Discord.RichEmbed()
    .setTitle("Error")
    .setDescription("Please give a reason.")
    .setColor(config.red);

  channel.send(embed).then(m => m.delete(5000));
}
