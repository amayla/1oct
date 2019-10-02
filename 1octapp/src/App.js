import React from 'react';
import Axios from 'axios'



class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      inputName: '',
      selectedFile:null
    }
  }



onAdd = () => {
  if(this.state.inputName){
    if(this.state.selectedFile){

    var fd = new FormData()
    
    fd.append('check', this.state.selectedFile, this.state.selectedFile.name)
    Axios.post('http://localhost:1101/uploadimage',fd)
    .then( res => {
      console.log(res)
      alert('success')
    })
    .catch(err => {
      console.log(err)
      alert('error')
    })
    }
  }
    
}

renderProducts=() => {

}


  render(){
    return (
      <div className="App">
        <header className="App-header" style={{textAlign:'center'}}>
          <h1>Product Manager</h1>
        </header>
        <body>
          <table className='form-control' style={{margin:'auto'}}>
            <thead>
              <th>Name</th>
              <th>Upload Image</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type='text'onChange={(e) => this.setState({inputName: e.target.value})}/>
                </td>
                <td>
                  <input type='file' ref='fileBtn' className='d-none' onChange={(e) => this.setState({selectedFile: e.target.files[0]})} />
                </td> 
                <td>
                <input className='button-big' type='Button' value='Add' style={{margin:'auto'}} onClick={this.onAdd}/>
                </td>    
              </tr>
            </tbody>
          </table>   
        </body>
      </div>
    );
  }
    
  }
  

export default App;
