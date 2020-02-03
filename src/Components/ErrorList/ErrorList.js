import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import './ErrorList.css';
import Grid from '@material-ui/core/Grid';
import image2 from '../image2.jpg'
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import HasError from '../HasError/HasError';
import reactStringReplace from 'react-string-replace';
import Button from '@material-ui/core/Button';
import convert from 'htmr';
import parse from 'html-react-parser';

const func = (match, index, offset) => <h1>{match}</h1>;

// const transform = {
//   p: HasError,

//   // you can also pass string for native DOM node
//   a: 'span',
// };

class ErrorList extends React.Component{
	constructor(){
		super();
		this.myfunc = this.myfunc.bind(this);
	}
  componentDidMount() {
    window.myfunc = null;
  }
  myfunc() {
  	console.log('character');
  }

	render(){

		const {errorList,text,textfield,addNewText} = this.props;
			let newArray = text.split('');
	let newText = [];
	let newObj = [];
	let test = '';
	let count =0;

	if(errorList.matches){

	errorList.matches.map((error,id) => {
		newObj.push([error.offset,error.length])
	})
	}

		newObj.map((array,index) => {
		newArray.map((character,id) => {
			if(id === array[0]){
			
			count++;
			newArray[id] = `<span 
			id=${index}
			error=${JSON.stringify(errorList.matches[index])}
			word=${text.substring(array[0],array[0]+array[1])}
			message=${JSON.stringify(errorList.matches[index].message.replace(/[^a-zA-Z .,?''/]/g, ""))}
			replacements=${JSON.stringify(errorList.matches[index].replacements[0].value)}
			rule=${JSON.stringify(errorList.matches[index].rule.issueType)}
			description =${JSON.stringify(errorList.matches[index].rule.description)}
			offset= ${JSON.stringify(array[0])}
			length= ${JSON.stringify(array[1])}>${newArray[id]}`
			
			newArray[array[0]+array[1]-1]= `${newArray[array[0]+array[1]-1]}</span>`;
		} 
		})
	})	
		let data = newArray.join("")
		let data1= data.split(' ')
		// let data = ReactHtmlParser(newArray.join(""))
	 let inputhtml = "<a onclick=window.myfunc()>HelloWorld</a>";
	return(

		<div className='bb b--black-30'>

		{
			// reactStringReplace(data, /(span)/g, func)

	
		}

		<Grid container justify='center' wrap='wrap' >
		<Grid xs={8} >
		{ 
		text.length >0? 	
			count===0 ? 
			<div className ='textarea burn'>PERFECTION</div>
			:
			<div className='textarea'>{
				// <div dangerouslySetInnerHTML={{ __html: data }} />
				// convert(data, {transform})

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
