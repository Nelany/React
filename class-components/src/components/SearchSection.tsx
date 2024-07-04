import { ChangeEvent, Component } from 'react'

interface SearchSectionState {
  query: string;
}

export default class SearchSection extends Component<object, SearchSectionState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  }

  handleSearch = () => {
    const { query } = this.state;
    console.log('Searching for:', query);
  }

  render() {
    return (
      <div className='section search-section'>
        <input
        className='search-input'
          type='text'
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder='Enter text...'
        />
        <button onClick={this.handleSearch}>Search!</button>
      </div>
    );
  }
}