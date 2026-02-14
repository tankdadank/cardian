# Cardian

Cardian is a Discord-native card game system built for fair, replayable gameplay with a clean, button-driven UI.

> Status: **Early development**  
> Expect balance tweaks, UI polish, and occasional breaking changes.

## What it includes

- **Games**: Blackjack, Poker, Pyramid
- **Modes**: Casual, Ranked, Custom, SVS (Server vs Server)
- **AI personalities (5)**: None, Cautious, Extreme, Contradicting, Grandmaster
- **Controls**: Buttons and dropdowns, no typing required
- **Integrity**: Anti-farming, match logging, monthly resets

## Setup

<details>
<summary><b>Bot setup</b></summary>
<br>

1. `cd cardian_bot`  
2. `cp .env.example .env`  
3. Edit `.env` with your credentials  
4. `npm install`  
5. Deploy slash commands: `node src/deploy-commands.js`  
6. Start with PM2: `pm2 start ecosystem.config.cjs`  
7. Save PM2 process list: `pm2 save`  

</details>

<details>
<summary><b>Website setup (separate service)</b></summary>
<br>

1. `cd website`  
2. `cp .env.example .env`  
3. Edit `.env` with your credentials  
4. `npm install`  
5. Start with PM2: `pm2 start src/index.js --name cardian-web`  
6. Save PM2 process list: `pm2 save`  

</details>

## Commands

| Command | Description |
|---|---|
| `/cardian` | Main hub and navigation |
| `/play` | Start a game |
| `/ranked` | Play competitive matches |
| `/data` | View and manage your data |
| `/variant` | View game variants |
| `/profile` | View player stats |
| `/achievements` | View achievements |
| `/mod` | Moderator tools (restricted) |
| `/dev` | Developer tools (restricted) |

## Config and data

<details>
<summary><b>Environment variables</b></summary>
<br>

See `.env.example` for all required and optional variables.

After changing environment variables:
- `pm2 restart all --update-env`

</details>

<details>
<summary><b>Data storage</b></summary>
<br>

- User data: `./data/users.json`  
- SVS data: `./data/svs.json`  
- Integrity logs: `./data/integrity_logs.json`  
- Farm flags: `./data/farm_flags.json`  
- Backups: `./backups/`  

</details>

## Policies

- Terms of Service: `/docs/tos.md`
- Privacy Policy: `/docs/privacy.md`
- Transparency: `/docs/transparency.md`
- Data Deletion: `/docs/deletion.md`

## Game Wiki

Detailed documentation for each game:
- [Wiki Index](/wiki/README.md)
- [Blackjack](/wiki/blackjack.md)
- [Poker](/wiki/poker.md)
- [Pyramid](/wiki/pyramid.md)
- [Gin Rummy](/wiki/rummy.md) (Experimental - Patreon only)
- [Mao](/wiki/mao.md) (Experimental - Patreon only)

## License

Cardian is source-available under the Cardian Source-Available License (CSAL) v1.0 (see `LICENSE`).  
You can run and modify it, but you can’t use it to provide a competing hosted bot/service.

If Cardian is discontinued (repo archived or no maintenance activity for 12 months), it becomes open source under the MIT License (see `OPEN_SOURCE_LICENSE`).

<details>
<summary><b>License summary (CSAL v1.0)</b></summary>
<br>

| Permissions | Limitations | Conditions |
|---|---|---|
| Run and modify Cardian | No competing hosted bot/service | Keep `LICENSE` and notices |
| Fork and redistribute | No trademark/branding rights | Mark significant changes |
| Self-host for your own servers | No warranty | Include license in distributions |
| Open source on discontinuation |  | MIT applies after discontinuation |

</details>

## FAQ

<details>
<summary><b>Does Cardian store messages or scan DMs?</b></summary>
<br>

No. Cardian does not store message content as part of normal operation.
</details>

<details>
<summary><b>Can Cardian be self-hosted?</b></summary>
<br>

Yes. Self-hosting for your own Discord servers is allowed under the CSAL license.
</details>

<details>
<summary><b>Can I run a hosted Cardian service for other people?</b></summary>
<br>

No. The CSAL license blocks competing hosted bot/services.
</details>

<details>
<summary><b>Why are some anti-abuse details not public?</b></summary>
<br>

Because people farm. Some thresholds and enforcement tuning stay private so Ranked and SVS stay playable.
</details>

<details>
<summary><b>What happens if the project dies?</b></summary>
<br>

If Cardian is discontinued (repo archived or no maintenance activity for 12 months), it becomes open source under MIT. See `OPEN_SOURCE_LICENSE`.
</details>

## Dev notes

<details>
<summary><b>Common dev commands</b></summary>
<br>

- Redeploy slash commands: `node src/deploy-commands.js`  
- PM2 status: `pm2 list`  
- Bot logs: `pm2 logs cardian --lines 200`  
- Restart bot with env refresh: `pm2 restart cardian --update-env`  

</details>

<details>
<summary><b>Sharding</b></summary>
<br>

Cardian uses discord.js sharding for scalability. The shard manager spawns shards automatically.

**Environment variables:**
- `SHARD_COUNT=auto` - Auto-detect shard count (recommended)
- `SHARD_COUNT=2` - Manual shard count

**Notes:**
- Slash commands deploy from the manager, not from shards
- Sessions are file-persisted for cross-shard consistency
- Each shard logs with `[Shard N]` prefix

To run without sharding (single instance):
```bash
pm2 start src/index.js --name cardian-single
```

</details>

<details>
<summary><b>Adding new games</b></summary>
<br>

1. Copy `src/games/template/` to `src/games/yourgame/`
2. Implement the required interface (see `template/README.md`)
3. Register in `src/core/registry/index.js`
4. Add wiki documentation in `wiki/yourgame.md`
5. Test thoroughly before enabling

See [template/README.md](src/games/template/README.md) for detailed instructions.

</details>

<details>
<summary><b>Common gotchas</b></summary>
<br>

- Linux paths are case-sensitive (`config.json` is not `Config.json`)
- If you have a build step, PM2 must start the built output (example: `dist/`), not the source

</details>
