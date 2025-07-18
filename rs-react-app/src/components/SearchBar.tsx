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
  handleSearch = () => {
    const trimmedText = this.state.input.trim();
    setSearchText(trimmedText);
    this.props.onSearch(trimmedText);
  };
  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
