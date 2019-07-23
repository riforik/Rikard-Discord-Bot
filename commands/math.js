const Discord = require("discord.js");
const errors = require("../utils/errors.js");
const ms = require("ms");
let config = require("../botconfig.json");
let helpFile = require("../utils/help.json");
let xp = require("../utils/xp.json");
const ranks = require("../utils/ranksPart.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  // message.delete();

  if (!message.member.hasPermission("SEND_MESSAGES")) return errors.noPerms(message, "SEND_MESSAGES");

  if (args[0] == "help") {
    message.reply(`${helpFile.math.name} ${helpFile.math.command}`);
    return;
  }

  let equation = args.join(" ");
  console.log(equation);

  function doEquation(equation) {
    // let cutEquation = equation.replace(/['"]+/g, '');
    try {
      let solvedEquation = eval(equation);
      message.reply(`${solvedEquation} is the sum of ${equation}`);
    } catch (e) {
      message.reply("Check your equation, use correct symbols as operators i.e. multiplication = *");
    }
  }

  function doPercentage(partialValue, totalValue) {
    try {
      let percVal = (100 * partialValue) / totalValue;
      if (percVal === NaN) {
        message.reply(`The result is not a number`);
      } else {
        message.reply(`${partialValue} percent of ${totalValue} is ${percVal}`);
      }
    } catch (e) {
      message.reply("Check your values");
    }
  }

  if (args[0] === "p") {
    doPercentage(args[1], args[2]);
  } else {
    doEquation(equation);
  }

}

module.exports.help = {
  name: "math"
}
