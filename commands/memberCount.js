const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();


  // If user asks for commands options
  if (args[0] == "help") {
    message.reply(`${helpFile.memberCount.name} ${helpFile.memberCount.command}`);
    return;
  }

  // get member using command
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]),
    memCount = message.guild.memberCount,
    memCountG = message.guild.members,
    botCount = 0,
    available = 0;

  let memCountB = Array.from(memCountG.values());

  for (var i = 0; i < memCountB.length; i++) {
    if (memCountB[i].user.bot) {
      botCount++;
    }
  }

  try {
    await message.reply(`There are ${memCount} members in ${message.guild.name} (${botCount} bots).`)
  } catch (e) {
    console.log(e.stack);
    message.reply(`Sorry I couldn't do the maths`)
  }
}

module.exports.help = {
  name: "memberCount"
}
