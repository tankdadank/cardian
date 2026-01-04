# Cardian Documentation

Internal documentation for development and operations.

## Contents

- [Terms of Service](tos.md)
- [Privacy Policy](privacy.md)
- [Transparency](transparency.md)
- [Data Deletion](deletion.md)
- [Game Wiki](/wiki/README.md)

## Development

### Adding a New Game

1. Copy the template folder:
   ```bash
   cp -r src/games/template src/games/yourgame
   ```

2. Edit each file:
   - `rules.js` - Define game constants, legal actions, win conditions
   - `engine.js` - Implement state transitions
   - `ui.js` - Create embeds and button/dropdown components
   - `ai.js` - Add AI decision logic (if applicable)
   - `variants.js` - Define game variants
   - `index.js` - Export game interface

3. Register the game in `src/core/registry/index.js`:
   ```javascript
   import * as yourgame from "../games/yourgame/index.js";
   registerGame("yourgame", yourgame);
   ```

4. Add to command handlers in `src/commands/play.js` (and custom.js if applicable)

5. Create wiki documentation in `wiki/yourgame.md`

6. Test thoroughly before enabling:
   - Set `enabled: false` in your game's index.js during development
   - Only enable after full testing

### Game Interface Requirements

Every game must export:

| Export | Type | Description |
|--------|------|-------------|
| `name` | string | Display name |
| `description` | string | Short description |
| `minPlayers` | number | Minimum players |
| `maxPlayers` | number | Maximum players |
| `startGame` | function | Start new game session |
| `handleAction` | function | Handle player action |
| `variants` | object | Variant definitions |
| `enabled` | boolean | Whether game is enabled |
| `experimental` | boolean | If Patreon-gated |
| `hasRanked` | boolean | Ranked eligibility |
| `hasSVS` | boolean | SVS eligibility |

## Sharding

Cardian uses discord.js ShardingManager for horizontal scaling.

### Configuration

| Env Variable | Default | Description |
|--------------|---------|-------------|
| `SHARD_COUNT` | `auto` | Number of shards (`auto` or number) |

### How It Works

1. `shard-manager.js` spawns shards
2. Each shard runs `index.js` with its own Client
3. Sessions are stored in JSON for cross-shard consistency
4. Slash commands deploy only once (handled by separate script)

### Running with Shards

**Development (single shard):**
```bash
SHARD_COUNT=1 node src/shard-manager.js
```

**Production (auto-scaling):**
```bash
pm2 start ecosystem.config.cjs
```

### Monitoring

```bash
# PM2 logs
pm2 logs cardian

# Check shard status
pm2 show cardian
```

## Data Files

| File | Purpose |
|------|---------|
| `data/users.json` | User profiles, stats, achievements |
| `data/sessions.json` | Active game sessions |
| `data/svs.json` | Server vs Server data |
| `data/access.json` | Dev/Mod access lists |
| `data/integrity_logs.json` | Match logs for integrity |
| `data/farm_flags.json` | Anti-farming flags |
| `backups/` | Automatic backups |

## Maintenance

### Scheduled Maintenance

Set via `/dev maintenance minutes:N`

During maintenance:
- New games blocked
- Active games paused
- Automatic resume after window

### Monthly Reset

Run via `/dev reset`

Resets:
- Ranked ratings (back to 500)
- SVS points
- Monthly achievements

Creates backup before reset.

### Backups

Automatic backups:
- On startup
- Before monthly reset
- On maintenance

Manual backup: `/dev backup`
