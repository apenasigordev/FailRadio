module.exports = {
  name: "join",
  aliases: ["j"],
  execute(client, message,args) {
    let voice = message.member.voice.channel;
    if(voice) return voice.join().then(c => {
      c.play("../Join.mp3");
    
      /*dispatcher.on("finish", () => {
        c.play("../Radio");
      });*/
    });
  }
};