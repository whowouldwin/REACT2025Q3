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
  page: number;
  totalPages: number;
}

export class App extends React.Component {
  state: State = {
    characters: [],
    loading: false,
    error: null,
    searchTerm: getSearchText(),
    page: 0,
    totalPages: 0,
  };

  componentDidMount() {
    void this.loadCharacters(this.state.searchTerm);
  }

  loadCharacters = async (text: string, page: number = 1) => {
    try {
      this.setState({ loading: true, error: null });

      const result = await fetchAll(text, page);

      this.setState({
        characters: result.results,
        loading: false,
        searchTerm: text,
        page,
        totalPages: result.info.pages,
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
    this.loadCharacters(text, 1);
  };

  handlePrev = () => {
    if (this.state.page > 1) {
      this.loadCharacters(this.state.searchTerm, this.state.page - 1);
    }
  };

  handleNext = () => {
    if (this.state.page < this.state.totalPages) {
      this.loadCharacters(this.state.searchTerm, this.state.page + 1);
    }
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
        <div className="pagination-controls">
          <button onClick={this.handlePrev} disabled={this.state.page <= 1}>
            Prev
          </button>
          <span>Page {this.state.page}</span>
          <button
            onClick={this.handleNext}
            disabled={this.state.page >= this.state.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default App;
