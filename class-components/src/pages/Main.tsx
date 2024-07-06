import { Component } from 'react';
import { SearchSection } from '../components/SearchSection';
import { ResultsSection } from '../components/ResultsSection';
import { CharacterResponse } from '../types/types';

export default class Main extends Component {
  state: { characterResponse: CharacterResponse | null } = {
    characterResponse: null,
  };

  setCharactersFromResponse(characterResponse: CharacterResponse) {
    this.setState({ characterResponse });
  }

  render() {
    return (
      <div className="main ">
        <h1 className="main__tittle">Rick and Morty</h1>
        <SearchSection
          setCharactersFromResponse={this.setCharactersFromResponse.bind(this)}
        />

        <ResultsSection characterResponse={this.state.characterResponse} />
      </div>
    );
  }
}
