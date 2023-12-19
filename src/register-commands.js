require('dotenv').config();
const {REST, Routes} = require('discord.js');

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