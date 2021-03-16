import React from 'react';
import Nav from  './Navigation.js'
// import Main from './Main.js';
import './Style.css';


class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div>
          <img onClick={this.props.logout} src={this.props.url} className="profile-image" alt="profile"></img>
        </div>
        <Nav />        
      </div>
    );
  }
};

function Profile(props) {
  return  
}


export default Header;