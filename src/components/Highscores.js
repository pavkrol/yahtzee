import React, { Component } from "react";
import styled from "styled-components";
import { firestore } from "../data/firebase";
import HighscoresTable from "./HighscoresTable";
import Button from "./Button";
import Loader from "./Loader";

const HighscoresWrapper = styled.div`
  width: 60%;
  max-width: 800px;
  min-height: 70vh;
  background-color: transparent;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px 1fr 70px;
  font-family: "Share", sans-serif;
  h2 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
  }
  table {
    grid-column: span 1;
    grid-row: span 1;
    justify-self: center;
  }
  button {
    grid-column: span 2;
    grid-row: span 1;
    justify-self: center;
  }
  @media (max-width: 900px) {
    margin: 50px 0;
    grid-template-rows: 70px 1fr 1fr 70px;
    table {
      grid-column: span 2;
    }
  }
  @media (max-width: 600px) {
    width: 85%;
  }
`;

class Highscores extends Component {
  state = {
    resultsNormal: [],
    resultsExtreme: [],
    isDataLoading: true
  };

  componentDidMount = async () => {
    const results = await firestore
      .collection("normalDifficulty")
      .orderBy("result", "desc")
      .limit(10)
      .get();
    const resultsNormal = results.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    const extreme = await firestore
      .collection("extremeDifficulty")
      .orderBy("result", "desc")
      .limit(10)
      .get();
    const resultsExtreme = extreme.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.setState({ resultsExtreme });
    this.setState({ resultsNormal });
    this.setState({ isDataLoading: false });
  };

  render() {
    const { resultsNormal, resultsExtreme, isDataLoading } = this.state;

    return (
      <HighscoresWrapper>
        <h2>Highscores</h2>
        {isDataLoading ? (
          <Loader />
        ) : (
          <HighscoresTable results={resultsNormal} header="Normal Difficulty" />
        )}
        {isDataLoading ? (
          <Loader />
        ) : (
          <HighscoresTable
            results={resultsExtreme}
            header="Extreme Difficulty"
          />
        )}
        <Button action={this.props.startAgain}>Main screen</Button>
      </HighscoresWrapper>
    );
  }
}

export default Highscores;
