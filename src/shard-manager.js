import "dotenv/config";
import { ShardingManager } from "discord.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const shardCount = process.env.SHARD_COUNT === "auto" ? "auto" : parseInt(process.env.SHARD_COUNT) || "auto";

const manager = new ShardingManager(join(__dirname, "index.js"), {
  token: process.env.DISCORD_TOKEN,
  totalShards: shardCount,
  respawn: true
});

manager.on("shardCreate", shard => {
  console.log(`[Shard ${shard.id}] Launched`);
  
  shard.on("ready", () => {
    console.log(`[Shard ${shard.id}] Ready`);
  });
  
  shard.on("disconnect", () => {
    console.log(`[Shard ${shard.id}] Disconnected`);
  });
  
  shard.on("reconnecting", () => {
    console.log(`[Shard ${shard.id}] Reconnecting`);
  });
  
  shard.on("death", event => {
    console.error(`[Shard ${shard.id}] Died`, event);
  });
  
  shard.on("error", error => {
    console.error(`[Shard ${shard.id}] Error:`, error);
  });
});

console.log(`Starting Cardian with ${shardCount === "auto" ? "automatic" : shardCount} shard(s)...`);
manager.spawn().catch(err => {
  console.error("Failed to spawn shards:", err);
  process.exit(1);
});
