/*
	Author: Quang Nguyen
	Purpose: TextBok component will display the text field and get the user input.
*/

import React from 'react';
import Grid from '@material-ui/core/Grid';
import image1 from '../image1.jpg'
import Hidden from '@material-ui/core/Hidden';
import './TextBox.css'
	const TextBox = ({handleTextEvent, errorList,textfield,text,onInput}) => {
		return(
		<div className='ba '>
		<Grid container justify='center' wrap='wrap' >
		
		{
			// Display input mode if onInput is true
			onInput?
			<Grid xs={8} >
			<textarea  rows="4" cols="50" maxlength="50000"
		style={{ float:'left',resize:'none',border: 'none',width:'100%', height:'295px'
				,fontSize: '18px', letterSpacing: '1px',
				fontFamily: 'Times New Roman, Times, serif',lineHeight:'1.6'}}
				onChange ={handleTextEvent}
				className=''
				defaultValue ={text}
				>
		</textarea>
		</Grid>
		: // Otherwise, disable input mode
		<Grid xs={8} >
		<div  className='textarea1'>{text}</div></Grid>
		}
		
		<Hidden mdDown>
	<Grid xs={4}> 
	<img src={image1} alt='' width='450px' height='300px'
	style={{float:'right',paddingLeft:'5px'}}/> 
	</Grid>
	</Hidden>
	

		</Grid>
        </div>
        );
}


export default TextBox;


/*

	<TextareaAutosize style={{width: '100%',fontSize: '18px',
							fontFamily: 'Times New Roman, Times, serif',
							letterSpacing: '1px', marginLeft:'30px'}} 
		 rowsMin={10}
		 rowsMax={10}
		 placeholder="Minimum 3 rows" 
		defaultValue= {textfield}
		onChange ={handleTextEvent}/>

*/