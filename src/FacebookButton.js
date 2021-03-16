import React from 'react'
import SocialLogin from 'react-social-login'
import { FacebookLoginButton } from "react-social-login-buttons"; 

class FacebookButton extends React.Component {
    static propTypes = {
        triggerLogin: PropTypes.func.isRequired,
        // triggerLogout: PropTypes.func.isRequired
      }
    render() {
        return (
            <button onClick={triggerLogin} {props}>
              { children }
            </button>
        );
    }
}

export default SocialLogin(FacebookButton);