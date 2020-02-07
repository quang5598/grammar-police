/*
	Author: Quang Nguyen
	Purpose: HasError component will receive the props that are passed 
			 from ErrorList component.
*/

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './HasError.css'

const HasError = ({word,message,replacements,rule,error,test,description,addNewText, offset, length}) => {
	const [open, setOpen] = React.useState(false);
  	const handleClickOpen = () => {
    setOpen(true);
  };

  	const handleClose = () => {
    setOpen(false);
  };

  // this function will pass the replacement text that the user has selected to root component
  const handleReplacement = (text,offset,length) =>{
  	addNewText(text,offset,length);
  	handleClose();
  }
  let array = replacements.split(',')
  let newReplacements  = array.map(replace => {
  	return replace.replace(/[^a-zA-Z ''?]/g, "");
  })

  	return (<div style={{display:'inline'}} >
		<span className= 'error'
			onClick={handleClickOpen}>{word}</span>
			
		<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{fontSize: '18px'}}
      >
        <DialogTitle style={{color:'red'}} id="alert-dialog-title">{`Error Type: ${rule}`}</DialogTitle>
        <DialogContent>
          
          <DialogContentText  id="alert-dialog-description">
            {message}
          </DialogContentText>
          <DialogContentText style={{fontStyle:'italic'}} id="alert-dialog-description">
            <span style={{fontStyle:'bold'}}>Tip: </span>{description}
          </DialogContentText>
          <DialogContentText  id="alert-dialog-description">
          {
          	newReplacements.map(replacement => {
          		return (
          		<Button style={{margin:'5px', backgroundColor:'#90EE90', color:'black'}} 
            			variant="contained" color="primary"
            			onClick ={() => handleReplacement(replacement,
            			 parseInt(offset),parseInt(length))}>{replacement}
            			</Button>);
	          	})
	          }
	         	
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
		
	</div>);

}


export default HasError;