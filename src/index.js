import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { readdirSync } from "fs";
import { handleInteraction } from "./events/interactions.js";
import { startMaintenanceScheduler, scheduleDaily, createBackup } from "./lib/operations.js";
import { checkCommandScope, checkBotPermissions } from "./lib/permissions.js";
import { critical, blunt } from "./lib/tone.js";
import { purgeOldLogs } from "./lib/integrity/logs.js";

const ANNOUNCE_CHANNEL_ID = process.env.ANNOUNCE_CHANNEL_ID || null;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandFiles = readdirSync("./src/commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
}

client.once("ready", () => {
  const shardInfo = client.shard ? `[Shard ${client.shard.ids[0]}] ` : "";
  console.log(`${shardInfo}Cardian online as ${client.user.tag}`);

  startMaintenanceScheduler(client, ANNOUNCE_CHANNEL_ID);
  console.log(`${shardInfo}Maintenance scheduler started`);

  purgeOldLogs();
  console.log(`${shardInfo}Old logs purged`);

  createBackup("startup");
  console.log(`${shardInfo}Startup backup created`);
});

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const scopeCheck = checkCommandScope(interaction.commandName, interaction.user.id, interaction.guildId);
    if (!scopeCheck.allowed) {
      return await interaction.reply({ content: blunt(scopeCheck.reason), ephemeral: true });
    }

    if (interaction.channel) {
      const permCheck = checkBotPermissions(interaction.channel);
      if (!permCheck.allowed) {
        return await interaction.reply({
          content: critical("permissionCritical") + permCheck.missing.join(", "),
          ephemeral: true
        });
      }
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Command error: ${interaction.commandName}`, error);
      const reply = { content: critical("unknownError"), ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply);
      } else {
        await interaction.reply(reply);
      }
    }
    return;
  }

  if (interaction.isButton() || interaction.isStringSelectMenu() || interaction.isUserSelectMenu()) {
    try {
      await handleInteraction(interaction);
    } catch (error) {
      console.error("Interaction error:", error);
      try {
        const reply = { content: critical("unknownError"), ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(reply);
        } else {
          await interaction.reply(reply);
        }
      } catch {}
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
