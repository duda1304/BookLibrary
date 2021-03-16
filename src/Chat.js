import React from 'react';
import './Style.css';

class Chat extends React.Component {
 
  render() {
    return (
      <div className="main">  
        <div className="main-header">
          <div>
            <h2>Chat</h2>
          </div>
        </div>      
        <div className="main-content">
        <p>This will be chat</p>
        </div>      
      </div>
    );
  }
};

export default Chat;


