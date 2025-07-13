import './App.css';
import { SearchBar } from './components/SearchBar.tsx';
import React from 'react';

export class App extends React.Component {
  handleSearch = (text: string) => {
    console.log(text);
  };
  render() {
    return (
      <div>
        <h1>Rick & Morty</h1>
        <SearchBar onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default App;
