import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = ()=>{
	return(
		<div className='br--left shadow-5 code white bold' style={{ paddingBottom:'20px'
		}}>
		<p className='ttu' style={{padding:'30px', fontWeight:'1000'}}>
        About the project
      </p>
      <div style={{fontWeight:'500',textAlign:'left',paddingLeft:'10px'}} className='white'>
      <p style={{textIndent:'30px'}}>
        Whether your English is a second language or a native language, you will always 
        make grammatical mistakes (Especially me!!!). But don't worry, Winnie-the-Police 
        has a duty to find any grammatical errors for you.
     </p>
     <p style={{textIndent:'30px'}}>
     The Grammar Police project uses the Grammar Bot API to check user text and find 
     any grammatical errors. The technology used in this project is React 
     as a front-end to transfer and receive data from the back-end server. Express.js 
     (node.js) is used as back-end to receive and return data to the front-end.</p>
      </div>
		<div>
		<a style={{color:'inherit',textDecoration: 'none'}} 
		href='https://github.com/quang5598'
		target="_blank">
		<GitHubIcon fontSize='large' className='grow pointer' 
		style={{paddingRight:'30px'}} /></a>
		<a style={{color:'inherit',textDecoration: 'none'}} 
		href='https://www.linkedin.com/in/quang-nguyen-730b28195'
		target="_blank">
		<LinkedInIcon fontSize='large' className='grow pointer' href='' />
		</a></div>


		</div>
		); // end return
}

export default Footer;