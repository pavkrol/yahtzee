import React, { Component } from "react";
import styled from "styled-components";
import { firestore } from "../data/firebase";

const HighscoresWrapper = styled.div`
  width: 500px;
  height: 200px;
  background-color: #fff;
  color: #000;
`;

class Highscores extends Component {
  state = {
    resultsArray: []
  };

  componentDidMount = async () => {
    const results = await firestore.collection("normalDifficulty").get();
    const resultsArray = results.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Results in component did mount: " + resultsArray);
    this.setState({ resultsArray });
  };

  render() {
    const { resultsArray } = this.state;

    return (
      <HighscoresWrapper>
        {console.log({ resultsArray })}
        {resultsArray.map(score => {
          <div key={score.id}>
            <h2>{score.name}</h2>
            <h3>{score.result}</h3>
          </div>;
        })}
      </HighscoresWrapper>
    );
  }
}

export default Highscores;
