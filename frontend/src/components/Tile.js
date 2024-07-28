import React from 'react';
import { Button } from 'react-bootstrap';

import './Tile.css'; // Import your CSS file

class Tile extends React.Component {
  render() {
    return (
      <div className="tile">
        <h2>{this.props.title}</h2>
        {/* <img alt='Missing'>{this.props.image}</img> */}
        <Button variant='success' onClick={this.props.onClick}>{this.props.description}</Button>
      </div>
    );
  }
}

export default Tile;