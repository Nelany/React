import { ChangeEvent, Component, KeyboardEvent } from 'react';
import { getCharacters } from '../api/api';
import { CharacterResponse } from '../types/types';

interface Props {
  setCharactersFromResponse: (response: CharacterResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
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
    }

    this.handleSearch();
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = async () => {
    this.props.setIsLoading(true);

    const { query } = this.state;
    const trimmedQuery = query.trim();

    setTimeout(async () => {
      const charactersResponse = await getCharacters(trimmedQuery);

      localStorage.setItem('searchQuery', trimmedQuery);

      this.props.setCharactersFromResponse(charactersResponse);
      this.props.setIsLoading(false);
    }, 1000);
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
