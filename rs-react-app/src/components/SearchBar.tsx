import React from 'react';
import { getSearchText, setSearchText } from '../utils/localStorage';

interface Props {
  onSearch: (text: string) => void;
}

interface State {
  input: string;
}

export class SearchBar extends React.Component<Props, State> {
  state: State = {
    input: getSearchText(),
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };
  handleSearch = () => {
    const trimmedText = this.state.input.trim();
    setSearchText(trimmedText);
    this.props.onSearch(trimmedText);
  };
  render() {
    return (
      <div className="p-4 flex gap-2 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 text-base rounded-md border border-gray-400 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          value={this.state.input}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button
          onClick={this.handleSearch}
          className="px-3 py-1 text-base rounded-lg border border-transparent hover:border-blue-400 bg-gray-900 dark:bg-gray-800 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    );
  }
}
