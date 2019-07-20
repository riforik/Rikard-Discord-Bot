const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");

module.exports.run = async (bot, message, args) => {
  message.delete();

  if (!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply(`${helpFile.removerole.name} ${helpFile.removerole.command}`);
    return;
  }
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(roles => roles.name === role);
  if (!gRole) return message.reply("Couldn't find that role.");

  if (!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await (rMember.removeRole(gRole.id));

  try {
    await rMember.send(`RIP, you lost the ${gRole.name} role.`).then(msg => msg.delete(3000));
  } catch (e) {
    message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. I tried to DM them, but their DMs are locked.`).then(msg => msg.delete(3000));
  }
}

module.exports.help = {
  name: "removerole"
}
