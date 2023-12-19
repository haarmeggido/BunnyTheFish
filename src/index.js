require('dotenv').config();
const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ]
})

client.on('ready', (c) => {
  console.log(` ${c.user.tag}! Jumping and Swimming, just for you!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;
  console.log(interaction.name);
  if (interaction.commandName === 'ping') {
    interaction.reply('pong');
  }
  if (interaction.commandName === 'jump') {
    interaction.reply('jump!');
  }
  if (interaction.commandName === 'swim') {
    interaction.reply('swim!');
  }

})

client.login(process.env.TOKEN);