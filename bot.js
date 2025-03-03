require("dotenv").config();

// Now use these variables in your code

const { Client, GatewayIntentBits } = require("discord.js");
const qrcode = require("qrcode-terminal");
const { Client: WhatsAppClient, LocalAuth } = require("whatsapp-web.js");

// Discord Bot Setup
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_CHANNEL_ID = "135040110931607552";

// WhatsApp Client Setup
const whatsappClient = new WhatsAppClient({
  authStrategy: new LocalAuth(),
});

// WhatsApp Authentication
whatsappClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above with WhatsApp!");
});

whatsappClient.on("ready", () => {
  console.log("WhatsApp client is ready!");
});

// Discord Bot Message Listener
discordClient.on("messageCreate", async (message) => {
  if (message.channel.id === DISCORD_CHANNEL_ID && !message.author.bot) {
    const chatId = "12086173097@c.us"; // Replace with your WhatsApp number in international format
    const content = `${message.author.username}: ${message.content}`;
    whatsappClient.sendMessage(chatId, content);
  }
});

// Log in to Discord
discordClient.login(DISCORD_TOKEN);

// Initialize WhatsApp Client
whatsappClient.initialize();
