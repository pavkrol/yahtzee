import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const RulesWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
`;
const RulesContent = styled.article`
  width: 70%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: calc(50% - 40vh);
  left: 15%;
  background-color: white;
  border-radius: 10px;
  color: #000;
  overflow-y: scroll;
  font-family: "Open Sans", sans-serif;
  padding: 30px 60px;
  z-index: 10;
  button {
    position: fixed;
    top: calc(50% - 40vh + 20px);
    right: calc(15% + 40px);
    font-size: 30px;
  }
  h2 {
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 30px;
  }
  h3 {
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 15px;
  }
  p,
  ul {
    font-size: 18px;
    margin-bottom: 30px;
    span {
      font-weight: 700;
    }
  }
  li {
    list-style: disc inside;
  }
  @media (max-width: 800px) {
    width: 85%;
    padding: 30px;
    left: 7.5%;
    button {
      right: calc(7.5% + 30px);
    }
  }
`;

const Rules = ({ closeRules }) => {
  return (
    <RulesWrapper>
      <RulesContent>
        <button onClick={closeRules}>X</button>
        <h2>Yahtzee rules</h2>
        <h3>Object of the game</h3>
        <p>
          The object of Yahtzee is to obtain the highest score from throwing 5
          dice. The game consists of 13 rounds. In each round, you roll the dice
          and then score the roll in one of 13 categories. You must score once
          in each category. The score is determined by a different rule for each
          category. The game ends once all 13 categories have been scored.
        </p>
        <h3>Game Start</h3>
        <p>
          To start with, roll all the dice. After rolling you can either score
          the current roll (see below), or re-roll any or all of the dice. You
          may only roll the dice a total of 3 times. After rolling 3 times you
          must choose a category to score. You may score the dice at any point
          in the round, i.e. it doesn't have to be after the 3rd roll.
        </p>
        <h3>Scoring</h3>
        <p>
          To score your combination of 5 dice, you click one of the 13 boxes.
          There are two sections to the score table - the Upper Section and the
          Lower Section. Once a box has been scored, it cannot be scored again
          for the rest of the game, so choose wisely.
        </p>
        <h3>Upper Section Scoring</h3>
        <p>
          If you score in the upper section of the table, your score is the
          total of the specified dice face. So if you roll: 5 - 2 - 5 - 6 - 5
          and score in the Fives category, your total for the category would be
          15, because there are three fives, which are added together. If the
          One, Three or Four Categories were selected for scoring with this
          roll, you would score a zero. If placed in the Two or Six category,
          you would score 2 and 6 respectively.
        </p>
        <p>
          <span>Bonus:</span> If the total of Upper scores is 63 or more, add a
          bonus of 35. Note that 63 is the total of three each of 1s, 2s, 3s,
          4s, 5s and 6s.
        </p>
        <h3>Lower Section Scoring</h3>
        <p>
          In the lower scores, you score either a set amount, or zero if you
          don't satisfy the category requirements. 3 and 4 of a kind For 3 of a
          kind you must have at least 3 of the same dice faces. You score the
          total of all the dice. For 4 of a kind you would need 4 dice faces the
          same.
        </p>
        <p>
          <span>Small and Large Straight:</span> A Straight is a sequence of
          consecutive dice faces, where a small straight is 4 consecutive faces,
          and a large straight 5 consecutive faces. Small straights score 30 and
          a large 40 points. So if you rolled: 2 - 3 - 2 - 5 - 4 you could score
          30 in small straight or 0 in large straight.
        </p>
        <p>
          <span>Full House:</span> A Full House is where you have 3 of a kind
          and 2 of a kind. Full houses score 25 points. i.e.: 3 - 3 - 2 - 3 - 2
          would score 25 in the Full House category.
        </p>
        <p>
          <span>First Yahtzee:</span> A Yahtzee is 5 of a kind and scores 50
          points, although you may elect NOT to score it as a yahtzee, instead
          choosing to take it as a top row score and safegaurd you bonus.{" "}
        </p>
        <p>
          <span>Additional Yahtzees:</span> If you roll a second Yahtzee in a
          game, and you scored your first yahtzee in the Yahtzee box, you would
          score a further bonus 100 points in the yahtzee box. You must also put
          this roll into another category, as follows:
        </p>
        <ul>
          <li>
            if the corresponding Upper section category is not filled then you
            must score there. ie if you rolled 4 - 4 - 4 - 4 - 4 and the Fours
            Category is not filled, you must put the score in the Fours
            category,
          </li>
          <li>
            if the corresponding Upper section category is filled you may then
            put the score anywhere on the Upper Section (scoring zero). In 3 of
            a Kind, 4 of a Kind, and Chance categories you would score the total
            of the dice faces. For the Small Straight, Large Straight, and Full
            House categories, you would score 30, 40 and 25 points respectively.
          </li>
        </ul>
        <p>
          <span>Chance:</span> You can roll anything and be able to put it in
          the Chance category. You score the total of the dice faces.
        </p>
        <h3> Scratch or Dump scores</h3>
        <p>
          You can score any roll in any category at any time, even if the
          resulting score is zero. Eg, you can take 2-3-3-4-6 in the 5's
          category. It will score 0. This could be used near the end of a game
          to lose a poor roll against a difficult-to-get category that you've
          failed to fill (eg, long straight or yahtzee).
        </p>
      </RulesContent>
    </RulesWrapper>
  );
};

export default Rules;

Rules.propTypes = {
  closeRules: PropTypes.func.isRequired
};
