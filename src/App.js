import React from 'react';
import logo from './logo.svg';
import './App.css';
import HasError from './Components/HasError/HasError';
import TextBox from './Components/TextBox/TextBox';
import ErrorList from './Components/ErrorList/ErrorList';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import icon from './icon.png';
import ReactHTMLConverter from 'react-html-converter/node'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      textfield: '',
      text:'',
      errorList: {},
      newText: '',
      onInput: true,
    }
  }

  handleTextEvent = (event) => {
    this.setState({textfield: event.target.value});
  }
  addNewText = (text,offset,length)=>{
    let newText = 
    this.state.text.replace(this.state.text.substring(offset, offset+length), text)
    // this.setState({text:
    //  this.state.text.replace(this.state.text.substring(offset, offset+length), text)});
    fetch('http://localhost:5000/geterror' , {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: newText,
      })
    }).then(response => response.json())
      .then(errorList => {
        
        if(errorList){
          this.setState({errorList: errorList,text:newText})
        } 
      })
  }
  handleButtonSubmit = () => {
    fetch('http://localhost:5000/geterror' , {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text: this.state.textfield,
      })
    }).then(response => response.json())
      .then(errorList => {
        
        if(errorList){
          this.setState({errorList: errorList,text:this.state.textfield,onInput: !this.state.onInput})
        }
      })
  }
  render(){
    console.log(this.state.errorList)

  return (

    <div className="App">{
    this.state.test}
    <Grid container >
    <Grid xs={12}>
    <img src={icon} alt='' width='300px' height='300px'/>
    </Grid>

  <Grid xs={1}></Grid>
 
  <Grid xs={9}>
  <div className='wrapper main'>

  <TextBox handleTextEvent = {this.handleTextEvent}
       errorList={this.state.errorList} textfield={this.state.textfield}
       text={this.state.text} onInput= {this.state.onInput}/>
       <div style={{float:'left', fontStyle:'italic'}}>{this.state.textfield.length}/50000</div>
      <Button variant="contained" color="secondary"
       onClick={this.handleButtonSubmit}>Generate</Button></div>
      </Grid>

  <Grid xs={1}> </Grid>

        <Grid xs={1}></Grid>
        <Grid xs={1}></Grid>

      <Grid xs={9}>
      <div className='wrapper main2'>
      <ErrorList textfield={this.state.textfield}
      errorList ={this.state.errorList}
       text={this.state.text} addNewText={this.addNewText}
       addNewText={this.addNewText}/></div>
       </Grid>
         <Grid xs={1}></Grid>

      </Grid>

    </div>
  );
} // end render
} // end class
export default App;
