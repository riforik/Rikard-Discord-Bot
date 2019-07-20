const Discord = require("discord.js");
let config = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  message.delete();
  let bicon = "https://pbcdn1.podbean.com/imglogo/dir-logo/219377/219377_300x300.png";
  let botembed = new Discord.RichEmbed()
    .setTitle("Actualized")
    .setDescription("How to tap into the potential you always knew you had.")
    .setColor(config.blue)
    .setImage("http://i.ytimg.com/vi/HZm4B4foybM/maxresdefault.jpg")
    .setThumbnail(bicon)
    .setAuthor(name = "What is Actualized.org", url = "https://actualized.org/", icon_url = "http://i.ytimg.com/vi/HZm4B4foybM/maxresdefault.jpg")
    .addField("About", "If you're like me, you get really excited by the idea of being world class, of being great at what you do, of living an extraordinary, successful life. But you're frustrated because it seems to slip through your fingers. The problem, of course, is that YOU are the bottleneck.")
    .setFooter("Learn more about Leo and actualized.org on their site.");

  return message.channel.send(botembed);
}
module.exports.help = {
  name: 'actualized'
}
