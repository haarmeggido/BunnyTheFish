require('dotenv').config();
const {Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
  ]
})
const roles = [
    {
        id: '1186830275309731920',
        label: 'Pion 1'
    },
    {
        id: '1186830457988468866',
        label: 'Pion 2'
    },
    {
        id: '1186830501298839582',
        label: 'Pion 3'
    },
    {
        id: '1186830713933275216',
        label: 'Rapidziątko'
    },
    {
        id: '1186830761387630602',
        label: 'Rapid'
    },
    {
        id: '1186830841763082270',
        label: '@Prusa'
    }
]

    client.on('ready', async (c) => {
        try {
            const channel = await client.channels.cache.get('933370967076532264');
            if (!channel) return;

            const row1 = new ActionRowBuilder();
            const row2 = new ActionRowBuilder();

            roles.forEach((role, index) => {
                const button = new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary);
                if (index < 5) {
                    row1.components.push(button);
                } else {
                    row2.components.push(button);
                }
            });

            await channel.send({
                content: 'Claim or remove a role below',
                components: [row1, row2]
            });
            process.exit();
        } catch (err) {
            console.log(err);
        }
    });

client.login(process.env.TOKEN);