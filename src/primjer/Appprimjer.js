import React from 'react';
import image from './profile.jpg';
import chatIcon from './Paper-Plane-icon.png'
import communityIcon from './Users-Group-icon.png'
import addIcon from './Add-icon.png'

import './Style.css';

class App extends React.Component {
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : "Name"
    }

  }
  render() {
    return (
      <div className="header">
        <div>
          <img src={image} className="profile-image" alt="profile"></img>
        </div>
        <div className="menu">
          <p>Wish list</p>
          <img src={chatIcon} className="menu-icon" alt="chat"></img>
          <img src={communityIcon} className="menu-icon" alt="community"></img>
        </div>
        
      </div>
    );
  }
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : "Name"
    }

  }
  render() {
    return (
      <div className="main">
        <div>
          <h2>MY LIBRARY</h2>
          <p>Add books to library</p>
        </div>
        <div>
          <img src={addIcon} className="menu-icon" alt="add"></img>
        </div>
        
      </div>
    );
  }
};

export default Header;
export default Main;


