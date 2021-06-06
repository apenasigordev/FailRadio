const {MessageEmbed} = require('discord.js');
const translate = require("translate");
module.exports = {
  name: "ajuda",
  aliases: ["help"],
  async execute(client,msg,args) {
    var embed = new MessageEmbed()
    .setTitle("🙋 • Ajuda")
    .setDescription("Olá, seja bem vindo a central de ajuda de FailRadio")
    .addField("🎙️ • Música", 
    "`f!radio, f!join e f!leave`")
    .addField("🙋 • Suporte", "Apenas use `f!support` para qualquer tipo de bug ou reportUser.")
    .setColor("PURPLE");
    msg.quote(embed);

  }
};