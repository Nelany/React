import { Component } from 'react';
import { SearchSection } from '../components/SearchSection';
import { ResultsSection } from '../components/ResultsSection';
import { CharacterResponse } from '../types/types';

interface MainState {
  characterResponse: CharacterResponse | null;
  isError: boolean;
  isLoading: boolean;
}

export default class Main extends Component {
  state: MainState = {
    characterResponse: null,
    isError: false,
    isLoading: false,
  };

  setCharactersFromResponse(characterResponse: CharacterResponse) {
    this.setState({ characterResponse });
  }

  setIsLoading(isLoading: boolean) {
    this.setState({ isLoading });
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
          alt="Rick and Morty"
        />

        <h1 className="main__tittle">Rick and Morty</h1>
        <SearchSection
          setCharactersFromResponse={this.setCharactersFromResponse.bind(this)}
          setIsLoading={this.setIsLoading.bind(this)}
        />

        <button className="error-button" onClick={this.handleErrorClick}>
          Create an error!
        </button>

        <ResultsSection
          isLoading={this.state.isLoading}
          characterResponse={this.state.characterResponse}
        />
      </div>
    );
  }
}
