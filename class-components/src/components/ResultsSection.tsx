import { Component } from 'react';
import { ResultsItem } from './ResultsItem';
import { CharacterResponse } from '../types/types';

interface Props {
  characterResponse: CharacterResponse | null;
  isLoading: boolean;
}

export class ResultsSection extends Component<Props> {
  state = {};

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="section results-section">
        <h3>Results:</h3>
        {this.props.isLoading && (
          <div className="spinner-container">
            <img className="spinner" src="./spinner.png" alt="Loading..." />
          </div>
        )}
        {!this.props.isLoading && this.props.characterResponse?.error && (
          <h4>{`${this.props.characterResponse.error}!`}</h4>
        )}
        {!this.props.isLoading &&
          this.props.characterResponse?.results &&
          this.props.characterResponse.results.map((character) => {
            return (
              <ResultsItem
                key={character.id}
                name={character.name}
                character={character}
              />
            );
          })}
      </div>
    );
  }
}
