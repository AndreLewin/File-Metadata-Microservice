import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from 'semantic-ui-react';

import './css/style.sass';


const ChooseFileButton = ({ onChange }) => (
  <div style={{display: "inline-block"}}>
    <input onChange={onChange} name="myFile" type="file" id="file-input-field" style={{display: "none"}} />
    <label className="ui button" htmlFor="file-input-field">
      Choose File
    </label>
  </div>
);

const SubmitButton = ({ enableSubmit }) => (
  <div style={{display: "inline-block"}}>
    <button type="submit" className="btn" id="file-submit" style={{display: "none"}} disabled={!enableSubmit} /> 
    <label className={"ui button" + (enableSubmit ? " primary" : "")} htmlFor="file-submit" >
        Submit
    </label>
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableSubmit: false
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange() {
    this.setState({ enableSubmit: true});
  }
  
  render() {
    return(
      <div>
        <Header as='h2'>Submit a file to view its filesize (limit 1MB)</Header>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <ChooseFileButton onChange={this.handleChange} />
          <SubmitButton enableSubmit={this.state.enableSubmit} />
        </form>
      </div>
    )
  }  
}

ReactDOM.render(<App />, document.getElementById('root'));