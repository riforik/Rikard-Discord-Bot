const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  const voiceChannel = message.member.voiceChannel;

  if (!voiceChannel) return errors.musicNoChannel(message.channel);

  if (!message.member.hasPermission("CONNECT")) return errors.noPerms(message, "CONNECT");
  if (!message.member.hasPermission("SPEAK")) return errors.noPerms(message, "SPEAK");

  if (args[0] == "help") {
    message.reply(`${helpFile.play.name} ${helpFile.play.command}`);
    return;
  }

  message.member.voiceChannel.leave();

}

module.exports.help = {
  name: "stop"
}
