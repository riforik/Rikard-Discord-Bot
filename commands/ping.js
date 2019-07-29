const Discord = require("discord.js");

module.exports.run = async (bot, message, args, someData, pingTimer) => {
  let pingTimerC = Date.now()-pingTimer;

  if (!message.member.hasPermission("SEND_MESSAGES")) return;
  const sayMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(`pong! ${pingTimerC}ms`).then(msg => msg.delete(3000));
}

module.exports.help = {
  name: "ping"
}
