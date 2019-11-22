import { roll_dice } from "../components/helpers";

export const initialDiceValues = [
  { hold: false, value: roll_dice() },
  { hold: false, value: roll_dice() },
  { hold: false, value: roll_dice() },
  { hold: false, value: roll_dice() },
  { hold: false, value: roll_dice() }
];

export const upperSectionInitial = [
  { category: "Aces", result: 0, confirmed: false },
  { category: "Twos", result: 0, confirmed: false },
  { category: "Threes", result: 0, confirmed: false },
  { category: "Fours", result: 0, confirmed: false },
  { category: "Fives", result: 0, confirmed: false },
  { category: "Sixes", result: 0, confirmed: false }
];

export const lowerSectionInitial = [
  { category: "3 of a kind", result: 0, confirmed: false },
  { category: "4 of a kind", result: 0, confirmed: false },
  { category: "Full House", result: 0, confirmed: false },
  { category: "Small Straight", result: 0, confirmed: false },
  { category: "Large Straight", result: 0, confirmed: false },
  { category: "Yahtzee", result: 0, confirmed: false },
  { category: "Chance", result: 0, confirmed: false }
];
