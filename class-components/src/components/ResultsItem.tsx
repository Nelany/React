import { Component } from 'react';
import { Character } from '../types/types';

type Props = {
  name: string;
  character: Character;
};

export class ResultsItem extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { character } = this.props;

    return (
      <div className="results-item">
        <img className="result-img" src={character.image} alt="img" />
        <div>
          <h2>{this.props.name}</h2>
          <h4>{`Status: ${character.status};`}</h4>
          <h4>{`Species: ${character.species};`}</h4>
          <h4>{`${character.type && `Type: ${character.type};`}`}</h4>
          <h4>{`Last known location: ${character.location.name};`}</h4>
        </div>
      </div>
    );
  }
}
