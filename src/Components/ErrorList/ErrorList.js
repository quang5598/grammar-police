/*
	Author: Quang Nguyen
	Purpose: Since React component doesn't render string content, The use of
	 dangerouslySetInnerHTML is needed to convert the textfield input
	to React Component

*/
import React from 'react';
import './ErrorList.css';
import Grid from '@material-ui/core/Grid';
import image2 from '../image2.jpg'
import Hidden from '@material-ui/core/Hidden';
import HasError from '../HasError/HasError';
import parse from 'html-react-parser';


class ErrorList extends React.Component{

  
	render(){
	const {errorList,text,addNewText} = this.props;
	let newArray = text.split(''); // convert each character from the string to an array
	let errorPosition = []; 
	let count =0;

		// If there's a error, push the offset and length from errorList
		// to errorPosition array
		if(errorList.matches){

		errorList.matches.map((error,id) => {
			errorPosition.push([error.offset,error.length])
		})
		}

		// For each error, add <span> element to that error 
		errorPosition.map((array,index) => {
		newArray.map((character,id) => {
			if(id === array[0]){
			
			count++;
			let replacements = errorList.matches[index].replacements.map(replace =>{
				return replace.value
			})
			
			newArray[id] = `<span 
			id=${index}
			error=${JSON.stringify(errorList.matches[index])}
			word=${text.substr(array[0],array[1])}
			message=${JSON.stringify(errorList.matches[index].message.replace(/[^a-zA-Z .,?''/]/g, ""))}
			replacements=${JSON.stringify(replacements.splice(0,5))}
			rule=${JSON.stringify(errorList.matches[index].rule.issueType)}
			description =${JSON.stringify(errorList.matches[index].rule.description)}
			offset= ${JSON.stringify(array[0])}
			length= ${JSON.stringify(array[1])}>${newArray[id]}`
			
			newArray[array[0]+array[1]-1]= `${newArray[array[0]+array[1]-1]}</span>`;
		} 
		})
	})	
		// join newArray array and covert it to string
		const data = newArray.join("")
	return(

		<div className='ba b--black-30'>
		<Grid container justify='center' wrap='wrap' >
		<Grid xs={8} >
		{ 
		// check if the text input is not empty
		text.length >0? 
			// check if we receive any error, if not, no grammatical errors has been found
			Object.entries(errorList).length ===0||count===0 ? 
			<div className ='textarea burn'>{text}</div>
			:
			// if we receive with an error, display the list of error.
			<div className='textarea'>

			{
				// using dangerouslySetInnerHTML to convert data string to React component
				parse(data, {
			  replace: domNode => {
			    if (domNode.attribs && domNode.name === 'span') {
			    return React.createElement('span', {}, 
			    <HasError 
			    error={domNode.attribs.error}
			    word={domNode.attribs.word}
			    message = {domNode.attribs.message} 
			    replacements={domNode.attribs.replacements}
			    rule={domNode.attribs.rule}
			    description={domNode.attribs.description}
			    addNewText={addNewText}
			    offset = {domNode.attribs.offset}
			    length = {domNode.attribs.length}/>);
			    }
		  }
		})
	}
			</div>
		// Display empty div field if the input field is empty
		:
		<div className='textarea'></div>
			}
		</Grid>
		<Hidden mdDown>
	<Grid xs={4}> 
	<img src={image2} alt='' width='450px' height='300px'
	style={{float:'right',paddingLeft:'5px'}}/> 
	</Grid>
	</Hidden>
		</Grid>
        </div>
		);

	}
}


export default ErrorList;
