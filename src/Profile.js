import React from 'react';

import './Style.css';

const images = require.context('./images', true);
const session = "matija";

class profileImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : session
    }

  }
  render() {
    return (
      <div className="profile-image">
        <img src={this.state.name.png}></img>
      </div>
    );
  }
};

export default profileImage;


