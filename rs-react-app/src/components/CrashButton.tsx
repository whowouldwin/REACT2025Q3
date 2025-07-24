import React from 'react';

interface Props {
  onCrash: () => void;
}

export class CrashButton extends React.Component<Props> {
  render() {
    return (
      <button className="btn btn-danger" onClick={this.props.onCrash}>
        Error Button
      </button>
    );
  }
}
