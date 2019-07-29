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

  let connection = await voiceChannel.join();
  if (!connection) {
      console.log(`Can't join voice channel`);
      return message.reply(`Can't join voice channel`);
  }

  const dispr = connection.playStream(ytdl(args[0]))
    .on('end', () => {
      message.channel.send(`Song over`);
      voiceChannel.leave();
    })
    .on('error', error => {
      console.log(error);
      message.channel.send(`Song wasn't able to play`);
    });

  dispr.setVolumeLogarithmic(5 / 5);
}

module.exports.help = {
  name: "play"
}
