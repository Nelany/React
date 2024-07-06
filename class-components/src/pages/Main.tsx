import { Component } from 'react';
import { SearchSection } from '../components/SearchSection';
import { ResultsSection } from '../components/ResultsSection';
import { CharacterResponse } from '../types/types';

interface MainState {
  characterResponse: CharacterResponse | null;
  isError: boolean;
}

export default class Main extends Component {
  state: MainState = {
    characterResponse: null,
    isError: false,
  };

  setCharactersFromResponse(characterResponse: CharacterResponse) {
    this.setState({ characterResponse });
  }

  handleErrorClick = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error('I crashed!');
    }
    return (
      <div className="main ">
        <img className="rick-morty-img" src="./rickmorty.png" alt="" />
        <img
          className="rick-morty-img rick-morty-img-reverse"
          src="./rickmorty.png"
          alt=""
        />

        <h1 className="main__tittle">Rick and Morty</h1>
        <SearchSection
          setCharactersFromResponse={this.setCharactersFromResponse.bind(this)}
        />

        <button className="error-button" onClick={this.handleErrorClick}>
          Create an error!
        </button>

        <ResultsSection characterResponse={this.state.characterResponse} />
      </div>
    );
  }
}
