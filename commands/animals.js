var fetch = require('node-fetch');
module.exports = {
  name: "animals", aliases: ["animais"],
  execute(client,message,args) {
    let array = ["https://aws.random.cat/meow"];
    let link = array[Math.floor(Math.random() * array.length)];
    fetch(link)
    .then(res => res.json())
    .then(data => {
      message.quote({file: [{attachment: data.file, name: "animal.png"}]});
    });
  },
};