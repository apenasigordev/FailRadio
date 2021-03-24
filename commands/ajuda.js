module.exports = {
  name: "ajuda",
  aliases: ["help"],
  execute(client,msg,args) {
    msg.quote(`Olá ${message.author}, sou FailRadio, um simples bot de música para Discord.\nComandos:\nf!radio (Numero da estação)\nf!leave\nf!support <pergunta/reporte>\nf!join\n\n<> - String\n() - Número`);

  }
};