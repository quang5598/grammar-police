import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import reactStringReplace from 'react-string-replace'



const HasError = ({word,message,replacements,rule,error,test,description,addNewText, offset, length}) => {
	const [open, setOpen] = React.useState(false);
  	const handleClickOpen = () => {
    setOpen(true);
  };

  	const handleClose = () => {
    setOpen(false);
  };

  const handleReplacement = (text,offset,length) =>{
  	addNewText(text,offset,length);
  	handleClose();
  }
  // let newReplacements = JSON.parse(replacements).map(obj => {
  // 	return obj;
  // })

  console.log(offset)
  // let newError= JSON.parse(error);
  	return (<div style={{display:'inline'}} >
			
			<span style={{backgroundColor: 'red', color:'white'}}
			onClick={handleClickOpen}>{word}</span>
		<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
         <Button style={{margin:'5px'}} 
            			variant="contained" color="primary"
            			onClick ={() => handleReplacement(replacements,
            			 parseInt(offset),parseInt(length))}>{replacements}
            			</Button>
            	
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