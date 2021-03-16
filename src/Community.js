import React from 'react';
import './Style.css';
import { FreeBooks } from './ServerCall.js';
import { SendToWishList } from './ServerCall.js';
import { GetUserInfo } from './ServerCall.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import addIcon from './Add-icon.png';
import chatIcon from './Paper-Plane-icon.png';

class Community extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        user: null
    }
    this.openModal = this.openModal.bind(this);
  }
  openModal = (e) => {
    const userData = GetUserInfo(e.target.id);
    this.setState(
      {open: true,
      user: userData}
      )
    document.getElementById("root").classList.add("blur");
    
  }
  closeModal = () => {
    this.setState(
      {open: false,
      user: null}
    )
    document.getElementById("root").classList.remove("blur");
  }
 
  render() {
    const WishList = JSON.parse(sessionStorage.getItem("wishList"));
    const FreeBooksList = FreeBooks();
    return (
      <div className="main">  
        <div className="main-header">
          <div>
            <h2>FREE BOOKS</h2>
            <p>Below is list of books from private collections that members want to give away.
              If you like some book, mark it and wait for member response.
            </p>
          </div>
        </div>      
        <div className="main-content">
          <div className="freeBooks">
              {FreeBooksList.map(element => (
              <div>
                  <img id={element.id} onClick={this.openModal} className="book-cover" src={process.env.PUBLIC_URL + element.imageUrl}></img>
                  <p>{element.location}</p>
              </div>
              ))}
          </div>
        </div>  
        <ModalWindow user={this.state.user} openModal={this.state.open} closeModal={this.closeModal} />
      </div>
    );
  }
};


function AddToWishList(e) {
  // send book to server to add in wishlist of user
  SendToWishList(e.target.id, sessionStorage.getItem("userId"));
  // if success update storage session
  console.log(sessionStorage.getItem("wishList"))
  // open modal for info
}

const HalfScreenUseStyles = makeStyles((theme) => ({
  paper: {
  width: "fit-content",
  height: "fit-content",
  backgroundColor: "gold",
  boxShadow: theme.shadows[5],
  padding: "10px",
  display:"flex",
  flexWrap: "wrap",
  flexDirection: "column",
  // alignItems: "center",
  position: "absolute",
  left: "20%",
  top: "20%"
  }
}
));

   
const ModalWindow = (props) => {
  const classes = HalfScreenUseStyles();
  let open = props.openModal;
    
  const handleClose = () => {
    props.closeModal();
  };

  let userName;
  let userUrl;
  let userLocation;
if (props.user === null) {
  userName = "";
  userUrl = "";
  userLocation = "";
} else {
  userName = props.user.name;
  userUrl = props.user.imageUrl;
  userLocation = props.user.location;
}
  return (
      <div>
          <Modal
              disableBackdropClick={true}
              open={open}
              >
              <Fade in={open}>
              <div className={classes.paper}>
              <img src={addIcon} onClick={handleClose} className="menu-icon close" alt="close"></img>
              <div className="flex-row">
               
                <img src={userUrl} className="profile-image" alt="profile"></img>
               
                <div className="flex-column">
                  <p>{userName} from {userLocation}</p>
                  <div className="flex-row">
                    <p>Contact user:</p>
                    <img src={chatIcon} className="menu-icon" alt="chat"></img>
                  </div>
               </div>
              </div>
              </div>
              </Fade>
          </Modal>
      </div>
);
}
  
export default Community;

