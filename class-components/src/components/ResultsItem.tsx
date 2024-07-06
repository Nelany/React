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
    return (
      <div className="results-item">
        <img src={this.props.character.image} alt="img" />
        <div>
          <h2>{this.props.name}</h2>
          <h4>{`Status: ${this.props.character.status};`}</h4>
          <h4>{`Species: ${this.props.character.species};`}</h4>
          <h4>{`${this.props.character.type && `Type: ${this.props.character.type};`}`}</h4>
          <h4>{`Last known location: ${this.props.character.location.name};`}</h4>
        </div>
      </div>
    );
  }
}
