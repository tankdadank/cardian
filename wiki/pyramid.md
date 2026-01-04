# Pyramid

A multiplayer solitaire card matching game where players compete to clear a pyramid of cards.

## Goal

Clear the most cards from the pyramid by matching pairs that sum to 13.

## Setup

- **Players**: 2-4
- **Deck**: Standard 52-card deck
- **Layout**: 28 cards in a pyramid (7 rows)
- **Deal**: Remaining cards form the draw pile

## Card Values

| Card | Value |
|------|-------|
| A | 1 |
| 2-10 | Face value |
| J | 11 |
| Q | 12 |
| K | 13 (clears alone) |

## Turn Flow

1. View the pyramid and your draw pile
2. Choose an action:
   - **Match**: Select two exposed cards that sum to 13
   - **King**: Select an exposed King to clear it alone
   - **Draw**: Draw a card from your pile (it becomes exposed)
   - **Skip**: Pass your turn
3. Cleared cards are removed and count as points
4. Play continues until pyramid is cleared or no moves remain

## Actions

| Button | What it does |
|--------|--------------|
| Reveal | Reveal a pyramid card |
| Match | Select two cards summing to 13 |
| King | Clear an exposed King |
| Skip | Pass your turn |

## Valid Pairs

| Pair | Sum |
|------|-----|
| A + Q | 1 + 12 = 13 |
| 2 + J | 2 + 11 = 13 |
| 3 + 10 | 3 + 10 = 13 |
| 4 + 9 | 4 + 9 = 13 |
| 5 + 8 | 5 + 8 = 13 |
| 6 + 7 | 6 + 7 = 13 |
| K alone | 13 |

## Variants

### Standard
- Basic pyramid rules
- First to clear wins

### Cascade
- Clearing cards causes "cascades"
- Adjacent cards may become clearable automatically
- More dynamic gameplay
- Ranked eligible

## Custom Mode

### Modifiers

| Modifier | Effect |
|----------|--------|
| Solo | Single player vs AI host |
| Timed | 5 minute time limit |
| Double Pyramid | Two pyramids, more cards |

## Ranked/SVS

- **Ranked**: ✅ Yes (Cascade variant)
- **SVS**: ✅ Yes (Cascade variant)

## Tips

- Plan ahead - clearing one card exposes others
- Kings are valuable - they clear without needing a pair
- Watch what opponents are revealing
- Sometimes it's better to skip than reveal a bad card
