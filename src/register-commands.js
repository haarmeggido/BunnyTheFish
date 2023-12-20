require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'pong!',
  },
  {
    name: 'jump',
    description: 'jump!',
  },
  {
    name: 'swim',
    description: 'swim!',
  },  
  {
    name: 'add',
    description: 'Adds two numbers together',
    options: [
      {
        name: 'first-number',
        description: 'First number',
        type: ApplicationCommandOptionType.Number,
        required: true,
        choices: [
          {
            name: 'One',
            value: 1,
          },
          {
            name: 'Two',
            value: 2,
          },
          {
            name: 'Three',
            value: 3,
          },
        ],
      },
      {
        name: 'second-number',
        description: 'Second number',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: 'embed',
    description: 'Sends an embed message',
  },
  // {
  //   name: 'role',
  //   description: 'Gives a role to a member',
  // },
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
(async () => {
  try{
    console.log('registering slash commands');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      {body: commands},
    );
    console.log('slash commands registered');
  }
  catch(error){
    console.error(error);
  }
})();