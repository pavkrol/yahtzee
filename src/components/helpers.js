export function calculateSumOf(diceSet, number) {
  return diceSet.reduce(
    (previous, current) =>
      current.value === number ? previous + current.value : previous,
    0
  );
}

export const calculateUpperTotal = upperResults => {
  const result = upperResults.reduce(
    (previous, current) =>
      current.confirmed ? previous + current.result : previous,
    0
  );
  return result;
};

export const calculateLowerTotal = lowerResults => {
  return lowerResults.reduce(
    (previous, current) =>
      current.confirmed ? previous + current.result : previous,
    0
  );
};

export const roll_dice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export const setPosition = index => {
  const areas = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen"
  ];
  const mediaQuery = window.matchMedia("(max-width: 800px)");
  const random = Math.floor(Math.random() * 3) + 1;
  let result = 0;
  if (mediaQuery.matches) {
    result = index;
  } else {
    result = random + 3 * index - 1;
  }
  return areas[result];
};

export const setRotation = () => {
  return Math.floor(Math.random() * 360) + 1;
};

export const calculateThreeOfAKind = dice_set => {
  const result = dice_set.reduce(function(previous, current) {
    if (current.value in previous) {
      previous[current.value]++;
    } else {
      previous[current.value] = 1;
    }
    return previous;
  }, {});
  let isThree = false;
  for (const item in result) {
    if (result[item] > 2) isThree = true;
  }
  const dice_sum = dice_set.reduce(
    (previous, current) => previous + current.value,
    0
  );

  return isThree ? dice_sum : 0;
};

export const calculateFourOfAKind = dice_set => {
  const result = dice_set.reduce(function(previous, current) {
    if (current.value in previous) {
      previous[current.value]++;
    } else {
      previous[current.value] = 1;
    }
    return previous;
  }, {});
  let isFour = false;
  for (const item in result) {
    if (result[item] > 3) isFour = true;
  }
  const dice_sum = dice_set.reduce(
    (previous, current) => previous + current.value,
    0
  );
  return isFour ? dice_sum : 0;
};

export const calculateFullHouse = dice_set => {
  let isFullHouse = false;
  if (calculateYahtzee(dice_set)) {
    isFullHouse = true;
  } else {
    const sorted_dice = dice_set.map(dice => dice.value).sort();
    (sorted_dice[0] === sorted_dice[1] &&
      sorted_dice[1] === sorted_dice[2] &&
      sorted_dice[2] !== sorted_dice[3] &&
      sorted_dice[3] === sorted_dice[4]) ||
    (sorted_dice[0] === sorted_dice[1] &&
      sorted_dice[1] !== sorted_dice[2] &&
      sorted_dice[2] === sorted_dice[3] &&
      sorted_dice[3] === sorted_dice[4])
      ? (isFullHouse = true)
      : (isFullHouse = false);
  }
  return isFullHouse ? 25 : 0;
};

export const calculateSmallStraight = dice_set => {
  let consecutive_count = 0;
  if (calculateYahtzee(dice_set)) {
    consecutive_count = 4;
  } else {
    const sorted_dice = dice_set
      .map(dice => dice.value)
      .sort()
      .filter((item, position, array) => {
        return !position || item !== array[position - 1];
      });

    sorted_dice.forEach((dice, index) => {
      index > 0 && dice === sorted_dice[index - 1] + 1
        ? consecutive_count++
        : null;
    });
  }
  return consecutive_count >= 3 ? 30 : 0;
};

export const calculateLargeStraight = dice_set => {
  let isLargeStraight = false;
  if (calculateYahtzee(dice_set)) {
    isLargeStraight = true;
  } else {
    const sorted_dice = dice_set.map(dice => dice.value).sort();
    (sorted_dice[0] === 1 &&
      sorted_dice[1] === 2 &&
      sorted_dice[2] === 3 &&
      sorted_dice[3] === 4 &&
      sorted_dice[4] === 5) ||
    (sorted_dice[0] === 2 &&
      sorted_dice[1] === 3 &&
      sorted_dice[2] === 4 &&
      sorted_dice[3] === 5 &&
      sorted_dice[4] === 6)
      ? (isLargeStraight = true)
      : (isLargeStraight = false);
  }
  return isLargeStraight ? 40 : 0;
};

export const calculateYahtzee = dice_set => {
  let isYatzee = false;
  const flat_array = dice_set.map(dice => dice.value);
  if (
    flat_array[0] === flat_array[1] &&
    flat_array[1] === flat_array[2] &&
    flat_array[2] === flat_array[3] &&
    flat_array[3] === flat_array[4]
  )
    isYatzee = true;
  return isYatzee ? 50 : 0;
};

export const calculateChance = dice_set => {
  const dice_sum = dice_set.reduce(
    (previous, current) => previous + current.value,
    0
  );
  return dice_sum;
};

export const calculateYahtzeeBonus = (lowerResults, yahtzeeCount) => {
  return lowerResults[5].confirmed && lowerResults[5].result > 0
    ? (yahtzeeCount - 1) * 100
    : 0;
};

export const calculateFinalResult = (
  upperResults,
  lowerResults,
  yahtzeeCount
) => {
  return (
    calculateUpperTotal(upperResults) +
    calculateLowerTotal(lowerResults) +
    (calculateUpperTotal(upperResults) >= 63 ? 35 : 0) +
    calculateYahtzeeBonus(lowerResults, yahtzeeCount)
  );
};
