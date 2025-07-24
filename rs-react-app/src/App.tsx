import './App.css';
import React from 'react';

import { fetchAll } from './api/rickAndMorty.ts';
import { CrashButton } from './components/CrashButton.tsx';
import { FallbackUI } from './components/FallbackUI.tsx';
import { SearchBar } from './components/SearchBar.tsx';
import { SearchResults } from './components/SearchResults.tsx';
import { ErrorBoundary } from './error/ErrorBoundary.tsx';
import { FetchError } from './error/FetchError.ts';
import { setSearchText, getSearchText } from './utils/localStorage.ts';

import type { Character } from './types/rickAndMorty.ts';

type Props = Record<string, never>;

interface State {
  characters: Character[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  page: number;
  totalPages: number;
  lastCount: number;
  crash: boolean;
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
    crash: false,
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

  triggerCrash = () => this.setState({ crash: true });

  render() {
    const { characters, loading, error, page, totalPages } = this.state;

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-lg border-b border-gray-700">
          <div className="container mx-auto py-4 px-4">
            <h1 className="text-3xl font-bold text-center text-blue-400 mb-4">
              Rick & Morty
            </h1>
            <SearchBar onSearch={this.handleSearch} />
          </div>
        </div>

        <div className="container mx-auto pt-40 pb-10 px-4">
          <ErrorBoundary fallback={<FallbackUI />}>
            <SearchResults
              data={characters}
              loading={loading}
              error={error}
              skeletonCount={this.state.lastCount}
              page={page}
              totalPages={totalPages}
              onPrev={this.handlePrev}
              onNext={this.handleNext}
              crash={this.state.crash}
            />
          </ErrorBoundary>
          <div className="mt-8 flex justify-center">
            <CrashButton onCrash={this.triggerCrash} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
