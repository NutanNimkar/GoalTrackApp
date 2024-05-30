import React from 'react';

import './Tile.css'; // Import your CSS file

class Tile extends React.Component {
  render() {
    return (
      <div className="tile">
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
        <img>{this.props.image}</img>
      </div>
    );
  }
}

export default Tile;
