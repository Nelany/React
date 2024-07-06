import { ChangeEvent, Component, KeyboardEvent } from 'react';
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

  componentDidMount() {
    const lastQuery = localStorage.getItem('searchQuery');
    if (lastQuery) {
      this.setState({ query: lastQuery }, this.handleSearch);
    } else {
      this.handleSearch();
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async () => {
    const { query } = this.state;
    const trimmedQuery = query.trim();
    localStorage.setItem('searchQuery', trimmedQuery);
    const charactersResponse = await getCharacters(trimmedQuery);
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
