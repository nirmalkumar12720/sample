import React, { Component } from 'react';
export default class Form extends Component{
    constructor(props){
        super(props);
        this.state={
                InFirstname:"",
                InLastname:"",
                LocalDB:[],
              
                inpgrid:false,
                inpform:true
        }
    }
    getvalues()
    {
      fetch('http://localhost:8040/getdata')
      .then(response => response.json())
      .then(data => this.setState({LocalDB:data}))
      console.log(this.state.LocalDB)
    }
    componentDidMount()
    {
      debugger
        this.getvalues();
    }
    fnchange=(e)=>
    {
        var FNinput = e.target.value;
        this.setState({InFirstname:FNinput})
    }
    lnchange=(e)=>
    {
        var LNinput = e.target.value;
        this.setState({InLastname:LNinput})
    }
    AddRowClick=()=>
    {
      debugger
      let valueobj = {
        Firstname:this.state.InFirstname,
        lastname:this.state.InLastname
      }
        {
        fetch(`http://localhost:8040/insertdata`,
        {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(valueobj)
        })
        .then(response=>response.json())
        .then(data=>this.setState({db:data})) 
      }
      this.setState({InFirstname:"",InLastname:""});
      this.getvalues();
    }
      
    showform=()=>
    {
      this.setState({inpform:true,inpgrid:false})
    }
    showgrid=()=>
    {
      this.setState({inpgrid:true,inpform:false})
      
    }
    BuildGrid=()=>{
      
        if(this.state.LocalDB !== undefined && this.state.LocalobjDB !==null )
        {
          return this.state.LocalDB.map((value,index)=>
          {
            return(<tr key={index}>
              <td>{value.firstname}</td>
              <td>{value.lastname}</td>
            </tr>)
          })
        }
    }

render(){
    return( <div className="app">
      <div>
        <div>
        {this.state.inpform==true?<button onClick={()=>this.showgrid()}>grid</button>
        :
        <button onClick={()=>this.showform()}>form</button>}
      </div>
     {this.state.inpform?   
      <div className="content">
        <div className="title">
          People Detail
        </div>
        <div className="row">
          <div className="leftcontent">
            First Name   
            <div style={{color:"red",fontSize:12}} >{this.state.firstnameErr}</div>
          </div>
          <div className="rightcontent" id="divFName">
            <input type="text" value= {this.state.InFirstname} onChange={(e)=>this.fnchange(e)} id="txtFN" />
          </div>
        </div>
        <div className="row">
          <div className="leftcontent">
            Last Name
            <div style={{color:"red",fontSize:12}} >{this.state.lastnameErr}</div>
          </div>
          <div className="rightcontent" id="divLName">
            <input type="text" value={this.state.InLastname} onChange={(e)=>this.lnchange(e)} id="txtLN" />
            {/*<label id="lbllnamemsg" style="color: red; display:none;">LastName can't be empty</label>*/}
          </div>
        </div>
        <div className="row">
          <div className="rightcontent">
            <button onClick={()=>this.AddRowClick()}>Submit</button>
          </div> 
        </div>
      </div> :null }
        {this.state.inpgrid?
        <div>
            {this.state.LocalDB.length > 0?
            <table>
              <thead><tr>
              <th>FirstName</th>
              <th>LastName</th>
              </tr></thead>
              <tbody>{this.BuildGrid()}</tbody>
            </table>:<td><label>No data entered</label></td>}
         </div>:null} 
      </div>    
    </div>
    )
}
}