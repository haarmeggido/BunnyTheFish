require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder} = require('discord.js');

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
  if (interaction.commandName === 'add') {
    const firstNumber = interaction.options.getNumber('first-number');
    const secondNumber = interaction.options.getNumber('second-number');
    interaction.reply(`The sum is ${firstNumber + secondNumber}`);
  }
  if (interaction.commandName === 'embed') {
    const embed = new EmbedBuilder()
      .setTitle('This is an embed')
      .setDescription('This is the description')
      .setColor('Red')
      .addFields({
        name: 'Field 1', value: 'Value 1', inline: true
      }, {
        name: 'Field 2', value: 'Value 2', inline: true
      });
      
      interaction.reply({embeds: [embed]});
  }
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) { //so absolutely to change
    try {
      await interaction.deferReply( {ephemeral: true});
      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({content: 'Role not found', ephemeral: true});
        return;
      }
      const hasRole = interaction.member.roles.cache.has(role.id);
      if (hasRole) {
        await interaction.member.roles.remove(role);
        interaction.editReply({content: `Role ${role.name} removed`, ephemeral: true});
        return;
      }
      await interaction.member.roles.add(role);
      interaction.editReply({content: `Role ${role.name} added`, ephemeral: true});
      return;   
    } catch (error) {
      console.log(error);
    }
  }
});
client.login(process.env.TOKEN);