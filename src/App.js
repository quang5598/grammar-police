import React from 'react';
import './App.css';
import Footer from './Components/Footer/Footer';
import TextBox from './Components/TextBox/TextBox';
import ErrorList from './Components/ErrorList/ErrorList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import icon from './icon.png';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CheckIcon from '@material-ui/icons/Check';
import Tooltip from '@material-ui/core/Tooltip';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      textfield: '', 
      text:'',
      errorList: {},
      onInput: true,
    }
  }

// Display ErrorList component  
errorList = () => {
  return (
    <ErrorList textfield={this.state.textfield}
      errorList ={this.state.errorList}
       text={this.state.text} addNewText={this.addNewText}
       />
    );
}

// Display TextBox component
textBox = () => {
  return (  
    <TextBox  handleTextEvent = {this.handleTextEvent}
       errorList={this.state.errorList} textfield={this.state.textfield}
       text={this.state.text} onInput= {this.state.onInput}/> 
      );
    }

  handleTextEvent = (event) => {
    this.setState({textfield: event.target.value});
  }
  fetchAPI = (text) => {
   return ( fetch('https://pure-ravine-07571.herokuapp.com/geterror' , {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: text,
      })
    }).then(response => response.json()));
  }


  addNewText = (text,offset,length)=>{
    let newText  = this.state.text.substr(0,offset)  +text + 
    this.state.text.substr(offset + length);
    this.fetchAPI(newText).then(errorList => {
        
        if(errorList){
          this.setState({errorList: errorList,text:newText, textfield: newText})
        }
      })
  }
  // Change to input mode when Input button is clicked 
  handleButtonInput = () => {
    this.setState({onInput: true}) 
  }
  // send data to the back-end server and then get the response from the grammarbot APi
  handleButtonSubmit = () => {
      this.fetchAPI(this.state.textfield).then(errorList => {
      // Check if the server response with data
        if(errorList){
          if(errorList.matches.length>0){

          this.setState({errorList: errorList,
                        text:this.state.textfield, 
                        onInput: false})
      } else {
        this.setState({onInput: true, text: this.state.textfield})
      }
        } 
      })
  }
  render(){
  return (
    <div className="App">{
    this.state.test}
    <Grid container >
    <Grid xs={12}>
    <img src={icon} alt='' width='300px' height='300px'/>
    </Grid>

  <Grid xs={1}></Grid>
 
  <Grid xs={9}>
  {
    this.state.onInput?
      <div className='wrapper main'>
      {this.textBox()}
       </div>
       :
       <div className='wrapper main2'>
      {this.textBox()}
       </div>

      }

      <div className='wrapper main'>
      <div style={{float:'left', fontStyle:'italic'}}>
       {this.state.textfield.length}/50000</div>
       <Tooltip title="Grammar Check">
       <Button
        variant="contained"
        color="secondary"
        style={{marginRight:'10px'}}
        onClick= {this.handleButtonSubmit}
        startIcon={<ArrowDownwardIcon style={{ fontSize:'2em' }}/>}
      >Check</Button></Tooltip>
      <Tooltip title="Back To Text Field">
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleButtonInput}
        startIcon={<ArrowUpwardIcon style={{ fontSize:'2em' }}/>}
      >Input</Button></Tooltip>
    {
        this.state.errorList.matches ? 
        this.state.errorList.matches.length !==0?
        <div className = 'alert' >

     Errors Found: <span style={{color:'red'}}>{this.state.errorList.matches.length}</span>
      </div>
      :
      <div className = 'alert' >

     <CheckIcon style={{color:'green'}} fontSize='inherit'/> 
     <span style={{color:'green'}}>Perfect</span>
      </div>
      :
      <div className='alert' style={{visibility:'hidden'}} >
     No Errors Found
      </div>
      }
      </div>

  
      </Grid>

  <Grid xs={1}> </Grid>

        <Grid xs={1}></Grid>
        <Grid xs={1}></Grid>

      <Grid xs={9}>
      
      {
        this.state.onInput?
        <div className='wrapper main2'>
        {this.errorList()}

        </div>

        :
        <div className='wrapper main'>
        {this.errorList()}
        </div>
      }

       </Grid>
         <Grid xs={1}></Grid>

      </Grid>
            <div style={{height:'150px'}}></div>
      <div style={{ backgroundColor:'#021b79'}}>
      <Footer isLoading={this.state.isLoading}/></div>
      
    </div>
  );
} // end render
} // end class
export default App;
