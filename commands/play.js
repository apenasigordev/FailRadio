module.exports = {
  name: "play",
  aliases: ["p"],
  async execute(client,message,args) {
     const string = args.join(" ");
     if(!string) return message.quote("Por favor, insira alguma música.\nSuporte: YouTube e SoundCloud");
     try {
            client.distube.play(message, string)
        } catch (e) {
          message.quote('Ocorreu algum erro: ' + e.stack)
        }
  }
};