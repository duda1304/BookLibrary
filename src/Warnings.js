import React from 'react';
import addIcon from './Add-icon.png'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';


const ModalWarning = () => {
    // const classes = props.class();
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
            <div>
                {/* <div onClick={handleOpen}>
                    {props.openIcon}
                </div> */}
                <Modal
                    disableBackdropClick={true}
                    open={open}
                    onClose={handleClose}>
                        <Fade in={open}>
                    <div>
                    <p>Something went wrong, please try again!</p>
                    </div>
                    </Fade>
                </Modal>
            </div>
    );
    
}

export default ModalWarning;


