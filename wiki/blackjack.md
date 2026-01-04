# Blackjack

A turn-based dealer game where you try to get as close to 21 as possible without going over.

## Goal

Beat the dealer by having a hand value closer to 21 without busting (going over 21).

## Setup

- **Players**: 1 (you vs dealer/AI)
- **Deck**: Standard 52-card deck
- **Deal**: You get 2 cards face-up, dealer gets 1 up and 1 down

## Card Values

| Card | Value |
|------|-------|
| 2-10 | Face value |
| J, Q, K | 10 |
| Ace | 1 or 11 (whichever is better) |

## Turn Flow

1. View your hand and dealer's visible card
2. Choose an action:
   - **Hit**: Draw another card
   - **Stand**: Keep your current hand
   - **Split**: If you have a pair, split into two hands (costs nothing extra)
   - **Surrender**: Give up half your stake (early surrender)
3. Repeat until you stand or bust
4. Dealer reveals and plays (must hit on 16 or less, stand on 17+)

## Actions

| Button | What it does |
|--------|--------------|
| Hit | Draw one card |
| Stand | End your turn |
| Split | Split a pair into two hands |
| Surrender | Forfeit (lose less than busting) |

## Win Conditions

- **Blackjack**: Ace + 10-value card on first two cards (pays 3:2)
- **Win**: Your hand > dealer's hand (both ≤21)
- **Lose**: You bust, or dealer's hand > yours
- **Push**: Same value as dealer (tie)

## Variants

### Standard
- Classic blackjack rules
- Bust = immediate loss
- Ranked eligible

### Debt Blackjack
- Going over 21 doesn't bust you - it gives you "debt"
- Debt = amount over 21
- Lower debt wins
- Zero debt beats any positive debt
- Ranked eligible (used for ranked play)

## Custom Mode

In Custom mode, you can combine Blackjack with:
- AI personality selection
- Variant selection
- Compatible modifiers

### Modifiers

| Modifier | Effect |
|----------|--------|
| Fast Deal | Reduced animation delay |
| Single Deck | Play with one deck |
| No Surrender | Disable surrender option |

## Ranked/SVS

- **Ranked**: ✅ Yes (Debt variant)
- **SVS**: ❌ No (single player)

## Tips

- Always hit on 11 or less
- Stand on 17+ against dealer 2-6
- Consider splitting Aces and 8s
- In Debt variant, lower is always better - even negative debt (under 21) beats positive debt
