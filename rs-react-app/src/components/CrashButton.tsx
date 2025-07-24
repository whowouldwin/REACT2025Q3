import React from 'react';

interface Props {
  onCrash: () => void;
}

export class CrashButton extends React.Component<Props> {
  render() {
    return (
      <button
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none  focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center gap-2"
        onClick={this.props.onCrash}
      >
        Error Button
      </button>
    );
  }
}
