module.exports = {
  name: "volume",
  aliases: ["v"],
  execute(client,message,args) {
    const queue = client.distube.getQueue(message)
        
        if(!queue) return message.quote("Não a nada tocando!");
        
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.quote("Escreva números válidos!");
        client.distube.setVolume(message, volume);
        message.quote("Volume alterado para: " + volume);
  }
};