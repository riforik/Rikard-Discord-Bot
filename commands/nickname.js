const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  // check to see if user has permissions
  if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
    return errors.noPerms(message, "MANAGE_NICKNAMES");
  }

  // If user asks for commands options
  if (args[0] == "help") {
    message.reply(`${helpFile.nickname.name} ${helpFile.nickname.command}`);
    return;
  }

  // get member using command
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);


  // if user is not found
  if (!rMember) return errors.cantfindUser(message.channel);

  // create nickname variable from arguments
  let nickname = args.join(" ").slice(22);

  // if the argument is empty
  if (!nickname) return message.reply("Specify a nickname!");

  console.log("------------------  D A T A  -------------------");
  console.log(`rMember: ${rMember}`);
  console.log(`Nickname: ${nickname}`);
  console.log(`Server: ${message.guild}`);
  console.log("------------------------------------------------\n\n");


  console.log("-------------  S E T   N I C K N A M E  ---------");
  rMember.setNickname(`${nickname}`, "No reason.")
    .then(console.log)
    .catch(console.error);
  console.log("-------------------------------------------------");

  try {
    await rMember.send(`Your nickname on ${message.guild.name} is now ${nickname}`).then(msg => msg.delete(3000));
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Sorry <@${rMember.id}>, they have been given the name ${gRole.nickname}. Their DM's are locked so the message wasn't sent. `).then(msg => msg.delete(3000)).then(msg => msg.delete(3000));
  }
}

module.exports.help = {
  name: "nickname"
}
