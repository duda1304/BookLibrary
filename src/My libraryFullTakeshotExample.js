import React from 'react';
import addIcon from './Add-icon.png'
import Webcam from "react-webcam";
// import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';import './Style.css';
// import Popover from '@material-ui/core/Popover';

class TakeShot extends React.Component {
    state = {
        imageData: null,
        // imageName: "",
        // saveImage: false
    }
    setRef = webcam => {
        this.webcam = webcam;
      };
    capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState(
        {
            imageData: imageSrc
        }
    )
    console.log(imageSrc)
    };
    // onClickRetake = (e) => {
    //     e.persist();
    //     this.setState({
    //         imageData: null
    //     })
    // }
    // onClickSave = (e) => {
    //     e.persist();
    //     this.setState((previousState) => {
    //         return {
    //             saveImage: !previousState.saveImage
    //         }
    //     });
    // }
    // handleChange = (e) => {
    //     e.persist();
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }
    // handleSaveSubmit = (e) => {
    //     e.preventDefault();
    //     let imageObject = {
    //         image_name: this.state.imageName,
    //         job_id: this.props.job.id,
    //         image_data: this.state.imageData
            
    //     }
    // }
    // saveForm = () => {
    //     return(
    //         <div>
    //             <form onSubmit={this.handleSaveSubmit}>
    //                 {/* <p>
    //                     <label>Image name:</label>
    //                     <input type="text"
    //                     name= "image_name"
    //                     value={this.state.imageName}></input>
    //                     <input type="submit" value="save"></input>
    //                 </p> */}
    //             </form>
    //         </div>
    //     )
    // }
    render(){

        const videoConstraints = {
            facingMode: "user"
        };
        
        return(
            <div className="main">
                <p>Tap on screen to take photo</p>
            <Webcam 
            onClick={this.capture}
                audio={false}
                width="100%"
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            {/* {this.state.imageData ?
                <div>
                    <p><img src={this.state.imageData} alt=""></img></p>
                    <span><button onClick={this.onClickRetake}>Retake?</button></span>
                    <span><button onClick={this.onClickSave}>Save</button></span>
                    {this.state.saveImage ? this.saveForm() : null}
                </div>    
            : null} */}
            </div>

        ); 
    }
}


class MyLibrary extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          display : "none"
        }
        this.ShowVideo = this.ShowVideo.bind(this);
      }
    ShowVideo() {
        this.setState(state => {
            if(state.display === "none") {
                return {display : "block"}
            } else {
                return {display : "none"}
            }
        })
    }
    
    render(){
        if (this.state.display === "none") {
            return(    
                <div className="main">  
                    <div className="main-header">
                        <div>
                            <h2>MY LIBRARY</h2>
                            <p>Add books to library</p>
                        </div>
                        <div>
                            <img src={addIcon} onClick={this.ShowVideo} className="menu-icon" alt="add"></img>
                        </div>
                    </div>      
                </div>
            )
        } else {
            return(  
               <TakeShot />
            )
        }
    }
}

// class CreateImages < ActiveRecord: :Migration[5.2]
//   def change
//     create_table: images do |t|
//       t.string :image_name,
//       t.binary: image_data limit: 2,megabytes
//       t.integer: job_id

//       t.timestamps
//       end
//       end
//       end
// >

export default MyLibrary;


