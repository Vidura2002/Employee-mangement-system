import { FaInfoCircle,FaCheckCircle } from "react-icons/fa"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from "react";

export const Errormessage = ({message}) =>{

    const [open,setOpen] = useState(true)
    const handleClose = () =>{
       setOpen(false)
    }
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
            {message}
            </Alert>
        </Snackbar>
    )
}

export const SucceMessage = ({message}) => {

    const [open,setOpen] = useState(true)
    const handleClose = () =>{
       setOpen(false)
    }
    return(
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
            {message}
            </Alert>
        </Snackbar>
    )
}