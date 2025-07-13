import React from 'react';

interface Props {
  onCrash: () => void;
}

export class CrashButton extends React.Component<Props> {
  render() {
    return (
      <button className="throw-btn" onClick={this.props.onCrash}>
        Error Button
      </button>
    );
  }
}
