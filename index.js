const {
    Client,
    GatewayIntentBits,
    Events,
    Partials,
  } = require("discord.js");
require ('dotenv').config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
	],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message:', error);
			return;
		}
	}
    if (reaction.emoji.name === process.env.EMOJI) {

        try {
            await reaction.message.pin();
        } catch (error) {
            console.error('Something went wrong when pinning the message:', error);
        }
    }
});

client.login(process.env.TOKEN);