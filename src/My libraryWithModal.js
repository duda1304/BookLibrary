import React from 'react';
import addIcon from './Add-icon.png'
import Webcam from "react-webcam";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import books from  './db.json';

class MyLibrary extends React.Component {
    render(){
            return(    
                <div className="main">  
                    <div className="main-header">
                        <div>
                            <h2>MY LIBRARY</h2>
                            <p>Add books to library</p>
                        </div>
                        <div>
                           <FullScreenModal /> 
                        </div>
                    </div>      
                </div>
            )
    }
}

const FullScreenUseStyles = makeStyles((theme) => ({
    paper: {
      width: "100%",
      height: "100vh",
      backgroundColor: "gold",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display:"flex",
      flexDirection: "column"
    },
}));

  
function FullScreenModal() {
    const classes = FullScreenUseStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
        <img src={addIcon} onClick={handleOpen} className="menu-icon" alt="add"></img>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <div className={classes.paper}>
            <img src={addIcon} onClick={handleClose} className="menu-icon rotated" alt="close"></img>
                <TakeShot />
            </div>
        </Modal>
        </div>
    );
}

class TakeShot extends React.Component {
    state = {
        imageData: null,
        foundBooks: null
    }
    setRef = webcam => {
        this.webcam = webcam;
      };
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState(
            {imageData: imageSrc}
        )
        // send data to server and wait for response
        console.log(imageSrc);
        console.log(books);
        // after response is recieved
        this.setState(
            {foundBooks: 1}
        )
    };
    render(){
        const videoConstraints = {
            facingMode: "user",
        };
        if (this.state.foundBooks != null) {
                return (
                    <div>
                    {books.books.map(element => (
                    <div className="flex-row">
                        <img className="book-cover" src={process.env.PUBLIC_URL + element.imageUrl}></img>
                        <div className="flex-column">
                            <h2>"{element.name}"</h2>
                            <p>{element.author}</p>
                        </div>
                    </div>
                    ))}
                </div>
                )
        } else {
            return(
                <div className="main">
                    <p>Tap on screen to take photo</p>
                    <Webcam 
                        onClick={this.capture}
                        audio={false}
                        width="100%"
                        height="fit-content"
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
            ); }
    }
}






// const FoundBooksUseStyles = makeStyles((theme) => ({
//     paper: {
//       width: "100%",
//       backgroundColor: "gold",
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     },
//   }));

// function FoundBooksModal() {
//     const classes = FoundBooksUseStyles();
//     const [open, setOpen] = React.useState(true);
//     // setOpen(true);
//     // const handleOpen = () => {
//     //     setOpen(true);
//     // };
//     const handleClose = () => {
//         setOpen(false);
//     };
   
//     const render = () => books.forEach(element => {
//         return (
//         <div>
//             <img scr={element.imageUrl}></img>
//             <p>{element.name}</p>
//             <p>{element.author}</p>
//         </div>
//         )
//     })
//     return (
//         <div>
//         <Modal
//             open={true}
//             onClose={handleClose}
//         >
//             <div className={classes.paper}>
//                 <p>Open modal</p>
//                 <img src={addIcon} onClick={handleClose} className="menu-icon rotated" alt="close"></img>
//                 <p>Is this the book?</p>
//                 {render}
//             </div>
//         </Modal>
//         </div>
//     );
    
// }

export default MyLibrary;


