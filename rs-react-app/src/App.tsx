import './App.css';
import { SearchBar } from './components/SearchBar.tsx';
import React from 'react';
import { type Character, fetchAll } from './api/rickAndMorty.ts';
import { setSearchText, getSearchText } from './utils/localStorage.ts';
import { ResultsList } from './components/ResultsList.tsx';
import { FetchError } from './error/FetchError.ts';

type Props = Record<string, never>;

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  page: number;
  totalPages: number;
  lastCount: number;
}

export class App extends React.Component<Props, State> {
  state: State = {
    characters: [],
    loading: true,
    error: null,
    searchTerm: getSearchText(),
    page: 0,
    totalPages: 0,
    lastCount: 20,
  };

  componentDidMount() {
    void this.loadCharacters(this.state.searchTerm);
  }

  loadCharacters = async (text: string, page: number = 1) => {
    this.setState((prev) => ({
      loading: true,
      error: null,
      lastCount: prev.characters.length,
    }));

    try {
      const result = await fetchAll(text, page);

      this.setState({
        characters: result.results,
        loading: false,
        searchTerm: text,
        page,
        totalPages: result.info.pages,
      });
    } catch (error) {
      let message = 'Unexpected error occurred';
      if (error instanceof FetchError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = `Generic error: ${error.message}`;
      }

      this.setState({ error: message, loading: false, totalPages: 0, page: 0 });
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
    const { characters, loading, error, page, totalPages } = this.state;

    return (
      <div>
        <div className="fixed-header">
          <h1>Rick & Morty</h1>
          <SearchBar onSearch={this.handleSearch} />
        </div>

        <div className="content">
          <ResultsList
            data={characters}
            loading={loading}
            error={error}
            skeletonCount={this.state.lastCount}
          />

          <div className="pagination-controls">
            <button onClick={this.handlePrev} disabled={page <= 1}>
              Prev
            </button>
            <span>Page {page}</span>
            <button onClick={this.handleNext} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
