import { ChangeEvent, Component, KeyboardEvent} from 'react';
import { getCharacters } from '../api/api';
import { CharacterResponse } from '../types/types';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
}

interface SearchSectionState {
  query: string;
}

export class SearchSection extends Component<Props, SearchSectionState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async () => {
    const { query } = this.state;
    const charactersResponse = await getCharacters(query);
    this.props.setCharactersFromResponse(charactersResponse);
    console.log('Response:', charactersResponse);
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  render() {
    return (
      <div className="section search-section">
        <input
          className="search-input"
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Enter text..."
        />
        <button onClick={this.handleSearch}>Search!</button>
      </div>
    );
  }
}
