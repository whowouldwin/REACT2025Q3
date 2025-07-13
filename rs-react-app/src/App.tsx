import './App.css';
import { SearchBar } from './components/SearchBar.tsx';
import React from 'react';
import { type Character, fetchAll } from './api/rickAndMorty.ts';
import { setSearchText, getSearchText } from './utils/localStorage.ts';
import { ResultsList } from './components/ResultsList.tsx';
import { FetchError } from './error/FetchError.ts';

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

export class App extends React.Component {
  state: State = {
    characters: [],
    loading: false,
    error: null,
    searchTerm: getSearchText(),
  };

  componentDidMount() {
    void this.loadCharacters(this.state.searchTerm);
  }

  loadCharacters = async (text: string) => {
    try {
      this.setState({ loading: true, error: null });

      const result = await fetchAll(text, 1);

      this.setState({
        characters: result.results,
        loading: false,
        searchTerm: text,
      });
    } catch (error: unknown) {
      let message = 'Unexpected error occurred';
      if (error instanceof FetchError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = `Generic error: ${error.message}`;
      }

      this.setState({ error: message, loading: false });
    }
  };

  handleSearch = (text: string) => {
    setSearchText(text);
    console.log(text);
    this.loadCharacters(text);
  };
  render() {
    return (
      <div>
        <h1>Rick & Morty</h1>
        <SearchBar onSearch={this.handleSearch} />
        <ResultsList
          data={this.state.characters}
          loading={this.state.loading}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
