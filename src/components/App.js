import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SeachAppointments';
import '../css/App.css';
import {findIndex,without} from 'lodash';


class App extends Component{

  constructor(){
    super();
    this.state = {
      myAppointments :[],
      formDisplay: false,
      lastIndex: 0,
      orderBy:'petName',
      orderDir:'asc',
      displayMenu : false,
      queryText:''
    };
    //this.deleteAppointment2 = this.deleteAppointment2.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.AddAppointments = this.AddAppointments.bind(this);
    this.displayMenuFunction = this.displayMenuFunction.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchAppointments = this.searchAppointments.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

     deleteAppointment(apt){
       const tempApts = [...this.state.myAppointments];
       const newtempApts = without(tempApts,apt);

       this.setState({
         myAppointments: newtempApts
       });
     }
    AddAppointments = temp => {
      const newAdd = [...this.state.myAppointments, {temp}];
     
      newAdd.unshift(temp);
     
      this.setState({
        myAppointments: newAdd,
        lastIndex : this.state.lastIndex + 1
      });
      
    }

    // deleteAppointment2 = (i) => {
    //   const newDelete = [...this.state.myAppointments];
    //     newDelete.splice(i,1);
    //     this.setState({
    //       myAppointments: newDelete
    //     });
    // }
    searchAppointments(query){
      this.setState({
        queryText: query
      })
    }
    displayMenuFunction(){
      this.setState({
        displayMenu : !this.state.displayMenu
      })
    }

    toggleForm(){
      this.setState({
        formDisplay: !this.state.formDisplay
      });
    }
    changeOrder(orderName,dir){
      this.setState({
        orderBy: orderName,
        orderDir: dir
      });
    }

    updateInfo(name,value,id){
      let tempApts= this.state.myAppointments;
      let aptIndex = findIndex(this.state.myAppointments,{
        aptId: id
      });
      tempApts[aptIndex][name] = value;
      this.setState({
        myAppointments: tempApts
      });
    }

    componentDidMount(){
      fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const appointments = result.map(
          item =>{
            item.aptId = this.state.lastIndex;
            this.setState({
              lastIndex: this.state.lastIndex + 1
            })
            return item;
          })
          this.setState({
            myAppointments: appointments
          })
        
      });
    }

  render(){

    let order;
    let filteredApts = this.state.myAppointments;
     if(this.state.orderDir === 'asc'){
       order = 1;
     }else{
       order = -1;
     }
   filteredApts = filteredApts.sort((a,b)=> {
      if(a[this.state.orderBy] < b[this.state.orderBy]){
        return -1 * order;
      }else{
        return 1 * order;
      }
    }).filter(eachItem =>{
      return(
        eachItem['petName'].includes(this.state.queryText.toLowerCase()) ||
        eachItem['ownerName'].includes(this.state.queryText.toLowerCase()) ||
        eachItem['aptNotes'].includes(this.state.queryText.toLowerCase())
      );
    });

    return (
      <main className="page bg-white" id="petratings">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
           
              <AddAppointments className="appointments" formDisplay={this.state.formDisplay}
                toggleForm={this.toggleForm} AddAppointments= {this.AddAppointments}
              
              />
              <SearchAppointments orderBy={this.state.orderBy} orderDir={this.state.orderDir} displaymenu= {this.state.displayMenu}
                displayMenuFunction = {this.displayMenuFunction} changeOrder={this.changeOrder}
                searchAppointments={this.searchAppointments}
              />
              <ListAppointments className="list" apts = {filteredApts} 
              deleteAppointment={this.deleteAppointment} updateInfo = {this.updateInfo}
              //deleteAppointment2 = {this.deleteAppointment2}
              />
              
            </div>
          </div>
        </div>
    </main>
    );
  }
}

  


export default App;
