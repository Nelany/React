import { Component } from 'react';

type Props = {
  name: string;
  description: string;
};

export class ResultsItem extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        <h4>{this.props.description}</h4>
      </div>
    );
  }
}
