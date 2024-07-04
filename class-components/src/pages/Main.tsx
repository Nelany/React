import { Component } from 'react';
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';

export default class Main extends Component {
  state = {};

  render() {
    return <div className='main'>
      <h1>Main</h1>
      <SearchSection/>
      <ResultsSection/>
    </div>;
  }
}
