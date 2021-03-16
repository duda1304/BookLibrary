import React from 'react';
import {NavLink} from 'react-router-dom';

import chatIcon from './Paper-Plane-icon.png'
import communityIcon from './Users-Group-icon.png'

import './Style.css';

// function Item1(props) {
//     return <p id="0" style={{display: props.visibility}}>My library</p>
//   }
// function Item2(props) {
//     return <p id="1" style={{display: props.visibility}}>Wish list</p>
//   }
// function Item3(props) {
//     return <img id="2" style={{display: props.visibility}} src={chatIcon} className="menu-icon" alt="chat"></img>
//   }
// function Item4(props) {
//     return <img id="3" style={{display: props.visibility}} src={communityIcon} className="menu-icon" alt="community"></img>
//   } 

class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    
    //     this.state = {
    //       home : "/",
    //       wishList : "/wish list",
    //       chat : "/chat",
    //       community : "/community"
    //     }
    //   }
    //   componentDidMount( 
    //     this.setState(
    //         {rerender: true}
    //     )
    //   )
      
    render() {
        return (
            <div>
                <nav className="menu">
                    <NavLink to="/" ><p>My library</p></NavLink>
                    <NavLink to="/wish list"><p>Wish list</p></NavLink>
                    <NavLink to="/chat"><img src={chatIcon} className="menu-icon" alt="chat"></img></NavLink>
                    <NavLink to="/community" ><img src={communityIcon} className="menu-icon" alt="community"></img></NavLink>
                </nav>
            </div>
        )
    }
}
  
// class Nav extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = {
//     visibility : ["none","block","block","block"],
//     main : 0
//     }
//     this.toggleVisibility = this.toggleVisibility.bind(this);
// }
// componentDidMount() {    
//     document.addEventListener("click", this.toggleVisibility);
// }
// componentWillUnmount() {
//     document.removeEventListener("click", this.toggleVisibility);
// }
// toggleVisibility(e) {
//     const item = parseInt(e.target.id);
//     this.setState( state =>
//     {
//         state.visibility = ["block","block","block","block"];
//         state.visibility[item] = "none";
//         state.main = item
//         return state.visibility;
//     }
//     );
// }
// render() {
//     return (
//     <div className="menu">
//         <Item1 visibility ={this.state.visibility[0]} />
//         <Item2 visibility ={this.state.visibility[1]} />
//         <Item3 visibility ={this.state.visibility[2]} />
//         <Item4 visibility ={this.state.visibility[3]} />
//     </div>
// );
// };
// }

export default Nav;