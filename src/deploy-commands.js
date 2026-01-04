import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";

const commands = [];
const commandFiles = readdirSync("./src/commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  if (command.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log(`Deploying ${commands.length} commands...`);

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log("Commands deployed.");
} catch (error) {
  console.error("Deploy error:", error);
}
