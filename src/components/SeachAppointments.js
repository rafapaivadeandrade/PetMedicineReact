import React, {Component} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';


export default class SeachAppointments extends Component{
    style={
        textDecoration:'none',
        color:'black'
    }
    block = {
      display:'block',
      backgroundColor:'white'
    }
    none = {
      display: 'none'
    }

    render(){
        
    return(
        
      
    <Dropdown className="movedropdown" onClick={this.props.displayMenuFunction}> <input
    id="searchApt"
       type="text"
       onChange={e => this.props.searchAppointments(e.target.value)}
   />
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn btn-primary dropdown-toggle" >
    Sort by
  </Dropdown.Toggle>

  <Dropdown.Menu className="dmenu" style={(this.props.displaymenu?
  this.none:this.block)
  } >
    <Dropdown.Item className={'sort-by dropdown-item ' +
    (this.props.orderBy === 'petName'?'active':'')
    }  href="#action-1" style= {this.style} onClick={e => this.props.changeOrder('petName',this.props.orderDir)}
    >Pet Name</Dropdown.Item><br/>
    <Dropdown.Item className={'sort-by dropdown-item ' +
    (this.props.orderBy === 'aptDate'?'active':'')
    }href="#action-2" style= {this.style} onClick={e => this.props.changeOrder('aptDate',this.props.orderDir)} >Date</Dropdown.Item><br/>
    <Dropdown.Item className={'sort-by dropdown-item ' +
    (this.props.orderBy === 'ownerName'?'active':'')
    }href="#action-3" style= {this.style} onClick={e => this.props.changeOrder('ownerName',this.props.orderDir)}>Owner</Dropdown.Item><br/>
    <Dropdown.Item className={'sort-by dropdown-item ' +
    (this.props.orderDir === 'asc'?'active':'')
    }href="#action-4" style= {this.style} onClick={e => this.props.changeOrder(this.props.orderBy,'asc')} >Asc</Dropdown.Item><br/>
    <Dropdown.Item className={'sort-by dropdown-item ' +
    (this.props.orderDir === 'dsc'?'active':'')
    }href="#action-5" style= {this.style} onClick={e => this.props.changeOrder(this.props.orderBy,'desc')} >Desc</Dropdown.Item>
  </Dropdown.Menu>
  
</Dropdown>


          
    )
     }
    
}