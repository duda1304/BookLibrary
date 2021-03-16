import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header.js';
import MyLibrary from './My library.js';
import WishList from './Wish list.js';
import Chat from './Chat.js';
import Community from './Community.js';
import Footer from './Footer.js'
import './Style.css';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";

import { SendLoginResponse } from './ServerCall.js';
import ModalWarning from './Warnings.js';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin : false,
      googleLogin : true
    }
  }
  responseFacebook = (response) => {
    console.log(response);
    // Send response data to server
  }
  responseGoogle = (response) => {
    // Send response data to server
    SendLoginResponse(response);
    
    // set state to true to diplay homepage of app, add user image and user books
      this.setState({
        loggedin : true,
      });
  }
  responseGoogleFailure = (response) => {
    return ModalWarning;
    console.log(response.code)
  }

  logout = () => {
    this.setState({
      loggedin : false,
      googleLogin :false
    });
  }

  render() {
    if (this.state.loggedin === false) {
      return (
        <div id="login-page">
          <h1>LIBRARY Jungle</h1>
          <div>
            <h2>LOGIN</h2>
            <p>To create personal digital library and share books with community</p>
          </div>
          <div className="login-buttons">
          <FacebookLogin
            appId="872923633195737" //APP ID LibraryJungle
            fields="name,email,picture"
            callback={this.responseFacebook}
            icon="fab fa-facebook-square"
            width="200px"
            render={renderProps => (
              <FacebookLoginButton onClick={renderProps.onClick} />
            )}
          />
          
          <GoogleLogin
            clientId="909405532878-nih42u2b6d0aaso0vnpibmdnbanid9k9.apps.googleusercontent.com" //CLIENTID LibraryJungle
            render={renderProps => (
              <GoogleLoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} 
              />
            )}
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogleFailure}
            isSignedIn={this.state.googleLogin}
          />
          </div>
        </div>
      );
    } else {
      return (
        <Router>
          <Header logout={this.logout} url={sessionStorage.getItem("userImageUrl")}/>
          <Switch>
            <Route exact path="/" render={(props) => <MyLibrary {...props} key={Math.random()} />} />
            <Route path="/wish list" render={(props) => <WishList {...props} key={Math.random()} />} />
            <Route path="/chat" render={(props) => <Chat {...props} key={Math.random()} />} />
            <Route path="/community" render={(props) => <Community {...props} key={Math.random()} />} />
          </Switch>
          <Footer />
        </Router>
      );
    }
  }
  }
// }

export default App;



