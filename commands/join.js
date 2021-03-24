module.exports = {
  name: "join",
  aliases: ["j"],
  execute(client, message,args) {
    let voice = message.member.voice.channel;
    if(voice) return voice.join();
  }
};