# Poker

Texas Hold'em style poker with pressure mechanics, played over three rounds.

## Goal

Win 2 out of 3 rounds by having the best 5-card hand.

## Setup

- **Players**: 1 vs AI (or 2 players)
- **Deck**: Standard 52-card deck
- **Chips**: 12 chips per player per round
- **Deal**: 2 hole cards each, 5 community cards revealed progressively

## Hand Rankings (Highest to Lowest)

1. Royal Flush (A-K-Q-J-10 same suit)
2. Straight Flush (5 consecutive same suit)
3. Four of a Kind
4. Full House (3 of a kind + pair)
5. Flush (5 same suit)
6. Straight (5 consecutive)
7. Three of a Kind
8. Two Pair
9. One Pair
10. High Card

## Turn Flow

Each round has betting streets:

1. **Pre-Flop**: 2 hole cards dealt
2. **Flop**: 3 community cards revealed
3. **Turn**: 4th community card
4. **River**: 5th community card
5. **Showdown**: Best 5-card hand wins

## Actions

| Button | What it does |
|--------|--------------|
| Reveal | See next community card(s) |
| Raise | Increase the stakes |
| Fold | Give up the round |
| Showdown | Compare hands |

## Variants

### Standard
- Classic Texas Hold'em flow
- Chips reset each round
- Best of 3 rounds

### Pressure Hold'em
- **Ranked variant**
- 12 chips, cost 3 per round
- If chips < 3, you're eliminated
- Creates natural pressure over 3 rounds
- Winner takes all

## Custom Mode

### Modifiers

| Modifier | Effect |
|----------|--------|
| All-In Mode | Single all-in showdown per round |
| Extended | Best of 5 rounds |
| Turbo | Faster reveals |

## Ranked/SVS

- **Ranked**: ✅ Yes (Pressure variant)
- **SVS**: ✅ Yes (Pressure variant)

## Tips

- Position matters - acting last gives information advantage
- Don't over-commit with marginal hands
- In Pressure, manage your chips - surviving is key
- Pay attention to the board texture for possible straights/flushes
