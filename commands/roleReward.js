const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args, zoolean) => {
  // message.delete();
  if (!zoolean) return errors.noPerms(message, "SEND_MESSAGES");

  //!addrole @andrew Dog Person
  if (!message.member.hasPermission("SEND_MESSAGES")) return errors.noPerms(message, "SEND_MESSAGES");
  if (args[0] == "help") {
    message.reply(`${helpFile.addrole.name} ${helpFile.addrole.command}`);
    return;
  }

  console.log(">-----------=====[R O L E]=====-----------<");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.find(members => members.id === args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args;
  role.shift();
  role = role.join(" ");
  console.log(`Role: ${role}`);
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(roles => roles.name === role);
  if (!gRole) return message.reply("Couldn't find that role.");

  console.log(`gRole: ${gRole}`);
  console.log(`User: ${rMember}`);
  console.log(`User args: ${args[0]}`);
  console.log(`Role args: ${args[1]}`);
  console.log(`Role args (join/slice): ${args.join(" ").slice(22)}`);
  console.log("-------------------------------------------");

  if (rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await (rMember.addRole(gRole.id));

  try {
    await rMember.send(`Congrats, you have been given the role ${gRole.name} on ${message.guild.name}`);
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. Their DM's are locked so the message wasn't sent. `).then(msg => msg.delete(3000));
  }
}

module.exports.help = {
  name: "roleReward"
}