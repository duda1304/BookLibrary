import React from 'react';
import addIcon from './Add-icon.png'
import Webcam from "react-webcam";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import books from  './db.json';
import { SendImageToServer } from './ServerCall.js';
import { SendText } from './ServerCall.js';

class MyLibrary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rerender: null,
        }
      }
    refresh = () => {
        this.setState(
            {rerender: true}
        )
    }
    render(){
        const mybooksArray = JSON.parse(sessionStorage.getItem("userBooks"));
        const openModal = <img src={addIcon} className="menu-icon" alt="add"></img>;
            return(    
                <div className="main">  
                    <div className="main-header">
                        <div>
                            <h2>MY LIBRARY</h2>
                            <p>Add books to library</p>
                        </div>
                        <div>
                           <ModalWindow 
                           class={FullScreenUseStyles}
                           refresh={this.refresh}
                           openIcon={openModal}
                           /> 
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="myLibrary">
                            {mybooksArray.map(element => (
                                <img key={element.id} id={element.id} className="book-cover" src={process.env.PUBLIC_URL + element.imageUrl}></img>
                                )
                            )}
                        </div>
                    </div>      
                </div>
            )
    }
}

const FullScreenUseStyles = makeStyles((theme) => ({
        paper: {
        width: "95%",
        height: "95vh",
        backgroundColor: "gold",
        boxShadow: theme.shadows[5],
        padding: "5px",
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        left: "2.5%",
        top: "2.5%"
        }
    }
));



const ModalWindow = (props) => {
    const classes = props.class();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.refresh();
    };
    
    return (
            <div>
                <div onClick={handleOpen}>
                    {props.openIcon}
                </div>
                <Modal
                    disableBackdropClick={true}
                    open={open}
                    onClose={handleClose}>
                        <Fade in={open}>
                    <div className={classes.paper}>
                    <img src={addIcon} onClick={handleClose} className="menu-icon close" alt="close"></img>
                    <TakeShot close={handleClose}/>
                    </div>
                    </Fade>
                </Modal>
            </div>
    );
}

class TakeShot extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            imageData: null,
            booksApiResponse: null,
            textBlocks: null,
            croppedImage: null
        }
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
        SendImageToServer(imageSrc)
        .then(data => {
            console.log(data)
            
                this.setState(
                    {
                    textBlocks: ImageBlocks(data.responses[0].fullTextAnnotation.pages[0].blocks)
                    }
                )
                this.setState(
                    {croppedImage: cropImage(imageSrc, data.responses[0], this.state.textBlocks)}
                )

                this.setState(
                    {booksApiResponse: 1
                    }
                )
        });
        
    };
    render(){
        const videoConstraints = {
            facingMode: "user",
        };
        if (this.state.booksApiResponse === null) {
            return(
                <div className="modal-takeShot">
                    <p id={"takeShot-instructions"}>Tap on screen to take photo</p>
                    <div className={"picture-frame"}></div>
                    <Webcam 
                        onClick={this.capture}
                        audio={false}
                        className="video"
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                     <canvas style={{display: "none"}} id={"canvas"}></canvas>
                     <img style={{display: "none"}} src={this.state.imageData} id={"imageCanvas"}></img> 
                </div>
            ); 
        } else {
            return(
                <MarkText crop={this.state.cropParameters} croppedImage={this.state.croppedImage} imageSrc={this.state.imageData} textBlocks={this.state.textBlocks} close={this.props.close}/>
            ); 
        }
    }
}

function AddToLibrary(title, author, imageSrc) {
    // send book to server to add in mybooks of user
    // server return mybooks data
    
    books.mybooks.push({
        "id": 1,
        "name": title,
        "author" : author,
        "imageUrl" : imageSrc
      });
    // update local storagge
    console.log(books)
    sessionStorage.setItem("userBooks", JSON.stringify(books.mybooks));
}


function ImageBlocks(blocks) {
    let textBlocks = [];

    for (let i = 0; i < blocks.length; i++) {
        let words = [];
        blocks[i].paragraphs.forEach(element => {
            element.words.forEach(element => {
                let letters =[];
                let word = "";
                element.symbols.forEach(element => {
                    letters.push(element.text)
                });
                word = letters.join('');
                words.push(word);
            });
        });

        let value = {
            "id": i,
            "x": blocks[i].boundingBox.vertices[0].x ,
            "y": blocks[i].boundingBox.vertices[0].y,
            "width": blocks[i].boundingBox.vertices[1].x - blocks[i].boundingBox.vertices[0].x ,
            "height": blocks[i].boundingBox.vertices[3].y -blocks[i].boundingBox.vertices[0].y,
            "words": words
        }
        textBlocks.push(value);
    }
    return textBlocks;
}

const MarkText = (props) => {
    const [paragraph, setParagraph] = React.useState("Please mark section with BOOK NAME");
    const [count, setCount] = React.useState(0);
    const [keywords, setKeywords] = React.useState([]);
    const [bookResults, setBookResults] = React.useState(null);
    
   
    const handleClick = (e) => {
        setCount(count+1);
        const textBlock = props.textBlocks.find(element => element.id === parseInt(e.target.id));
        setKeywords([...keywords, textBlock.words]) 
        if (count < 1) {
            setParagraph("Please mark section with AUTHOR");
        }
    }
    
    React.useEffect(() => {
        if (count === 2) {
            SendText(keywords)
                .then(data => books(data))
        }
      });
    
    const books = (data) => {
        setCount(count+1);
        if (data.totalItems === 0) {
                setBookResults("no results");
            } else {
                setBookResults(data.items)
            }
    }  

    if (bookResults === null) {
        return (
            <div className="modal-takeShot">
                <p id={"takeShot-instructions"}>{paragraph}</p>
                <div style={{position: "relative"}}>
                    <img id="cameraImage" src={props.imageSrc} alt="Your book"></img>
                    {props.textBlocks.map(element => (
                        <div onClick={(e) => {handleClick(e)}} id={element.id} key={element.width} className={"textblock"} style={{left: element.x, top: element.y, width: element.width, height: element.height}}></div>
                    ))}
                </div>
            </div>
        )
    } else {
        if (bookResults === "no results") {
            return (
                <div className="modal-bookResults">
                    <h2>Book ready for digital library. If you are not satisfied with result try again.</h2>
                        <div className="flex-row">
                            <img onClick={(e) => {props.close();AddToLibrary(keywords[0].join(" "), keywords[1].join(" "), props.croppedImage);}} className="book-cover" src={props.croppedImage}></img>
                            <div className="flex-column">
                                <h2>"{keywords[0].join(" ")}"</h2>
                                <p>{keywords[1].join(" ")}</p>
                            </div>
                        </div>

                </div>
            )
        } else {
            return (
                <div className="modal-bookResults">
                    <h2>Is this your book?</h2>
                    {bookResults.map(element => 
                    { if (element.volumeInfo.hasOwnProperty('imageLinks')) {
                        return (
                            <div className="flex-row">
                                <img key={element.id} id={element.id} onClick={(e) => {props.close();AddToLibrary(element.volumeInfo.title, element.volumeInfo.author, element.volumeInfo.imageLinks.thumbnail);}} src={element.volumeInfo.imageLinks.thumbnail} alt={"book cover"} className="book-cover" ></img>
                                <div className="flex-column">
                                    <h2>"{element.volumeInfo.title}"</h2>
                                    <p>{element.volumeInfo.authors}</p>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div className="flex-row">
                                <img key={element.id} id={element.id} onClick={(e) => {props.close();AddToLibrary(element.volumeInfo.title, element.volumeInfo.author, props.croppedImage);}}  src={props.croppedImage} alt={"book cover"} className="book-cover" ></img>
                                <div className="flex-column">
                                    <h2>"{element.volumeInfo.title}"</h2>
                                    <p>{element.volumeInfo.authors}</p>
                                </div>
                            </div>
                        )
                    }
                    }
                    )}
                </div>
            )
        }
    }
}



const cropImage = (imageSrc, response, blocks) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('imageCanvas');

    const imageWidth = img.width;
    const imageHeight = img.height;
    
    if (response.hasOwnProperty("localizedObjectAnnotations")) {
        // get data from vision API object localization
        const cropStartX = response.localizedObjectAnnotations[0].boundingPoly.normalizedVertices[0].x * imageWidth;
        const cropStartY = response.localizedObjectAnnotations[0].boundingPoly.normalizedVertices[0].y * imageHeight;
        const cropWidth = response.localizedObjectAnnotations[0].boundingPoly.normalizedVertices[1].x * imageWidth - response.localizedObjectAnnotations[0].boundingPoly.normalizedVertices[0].x * imageWidth;
        const cropHeight = response.localizedObjectAnnotations[0].boundingPoly.normalizedVertices[3].y * imageHeight - response.localizedObjectAnnotations[0].boundingPoly.normalizedVertices[0].y * imageHeight;
        // define canvas size
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        // draw image on canvas and return 64base code of cropped image
        ctx.drawImage(img, cropStartX, cropStartY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        var dataImg = canvas.toDataURL("image/jpeg");
        return (dataImg)

    } else {
        // get data from vision API blocks with text 
        const x = [];
        const y = [];
        blocks.forEach(element => {
            x.push(element.x);
            x.push(element.x + element.width);
            y.push(element.y);
            y.push(element.y + element.height);
        });
        const xMin = Math.min(...x);
        const xMax = Math.max(...x);
        const yMin = Math.min(...y);
        const yMax = Math.max(...y);
        // define croppping data by adding 10% to most exstreme text positions
        const cropStartX = xMin - xMin*0.10;
        const cropStartY = yMin - yMin*0.10;
        const cropWidth = (xMax + xMax*0.10) - (xMin - xMin*0.10);
        const cropHeight = (yMax + yMax*0.10) - (yMin - yMin*0.10);
        // define canvas size
        canvas.width = cropWidth;
        canvas.height = cropHeight;
        // draw image on canvas and return 64base code of cropped image
        ctx.drawImage(img, cropStartX, cropStartY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        var dataImg = canvas.toDataURL("image/jpeg");
        return (dataImg)
    }
}


export default MyLibrary;
