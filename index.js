const fs = require("fs");
const Discord = require("discord.js");
const config = require('./config.json');

const client = new Discord.Client();
client.config = config;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.coolDowns = new Discord.Collection();

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/Core/", (err, files) => {
  if (err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Core folder...`, '\x1b[0m');

  console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Core folder...`, '\x1b[0m');
  jsFiles.forEach((f, i) => {
    let props = require(`./commands/Core/${f}`);
    console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
    client.commands.set(props.name, props);
  });
});


// fs.readdir("./commands/Dev/", (err, files) => {
//   if (err) console.error(err);
//   let jsFiles = files.filter(f => f.split(".").pop() === "js");

//   if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Dev folder...`, '\x1b[0m');

//   console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Dev folder...`, '\x1b[0m');
//   jsFiles.forEach((f, i) => {
//     let props = require(`./commands/Dev/${f}`);
//     console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
//     client.commands.set(props.name, props);
//   });
// });

fs.readdir("./commands/Features/", (err, files) => {
  if (err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Features folder...`, '\x1b[0m');

  console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Features folder...`, '\x1b[0m');
  jsFiles.forEach((f, i) => {
    let props = require(`./commands/Features/${f}`);
    console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
    client.commands.set(props.name, props);
  });
});

fs.readdir("./commands/Fun/", (err, files) => {
  if (err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Fun folder...`, '\x1b[0m');

  console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Fun folder...`, '\x1b[0m');
  jsFiles.forEach((f, i) => {
    let props = require(`./commands/Fun/${f}`);
    console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
    client.commands.set(props.name, props);
  });
});

// fs.readdir("./commands/Logging/", (err, files) => {
//   if (err) console.error(err);
//   let jsFiles = files.filter(f => f.split(".").pop() === "js");

//   if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Logging folder...`, '\x1b[0m');

//   console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Logging folder...`, '\x1b[0m');
//   jsFiles.forEach((f, i) => {
//     let props = require(`./commands/Logging/${f}`);
//     console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
//     client.commands.set(props.name, props);
//   });
// });

// fs.readdir("./commands/Moderation/", (err, files) => {
//   if (err) console.error(err);
//   let jsFiles = files.filter(f => f.split(".").pop() === "js");

//   if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Moderation folder...`, '\x1b[0m');

//   console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Moderation folder...`, '\x1b[0m');
//   jsFiles.forEach((f, i) => {
//     let props = require(`./commands/Moderation/${f}`);
//     console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
//     client.commands.set(props.name, props);
//   });
// });

// fs.readdir("./commands/Options/", (err, files) => {
//   if (err) console.error(err);
//   let jsFiles = files.filter(f => f.split(".").pop() === "js");

//   if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Options folder...`, '\x1b[0m');

//   console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Options folder...`, '\x1b[0m');
//   jsFiles.forEach((f, i) => {
//     let props = require(`./commands/Options/${f}`);
//     console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
//     client.commands.set(props.name, props);
//   });
// });

fs.readdir("./commands/Utility/", (err, files) => {
  if (err) console.error(err);
  let jsFiles = files.filter(f => f.split(".").pop() === "js");

  if (jsFiles.length <= 0) return console.log('\x1b[31m', `[BOT] There are no commands to load from the Utility folder...`, '\x1b[0m');

  console.log('\x1b[33m', `[BOT] Loading ${jsFiles.length} command(s) from the Utility folder...`, '\x1b[0m');
  jsFiles.forEach((f, i) => {
    let props = require(`./commands/Utility/${f}`);
    console.log('\x1b[32m', `[BOT] ${i + 1}: ${f} loaded!`, '\x1b[0m');
    client.commands.set(props.name, props);
  });
});

client.login(config.Token);