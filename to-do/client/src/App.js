import React, { Component } from 'react';
import Table from './TaskTable.js';
import './App.css';

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            term: '',
            items: []
        };
    }
    
    onChange = (event) => {
        this.setState({term: event.target.value});
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.term.replace(/^\s+/g, '').length < 1)
        {
            var warning = document.getElementById('warning');
            warning.style.visibility = "visible";
            this.setState({
                term: ''
            });
            
        }
        else
        {
            var warning = document.getElementById('warning');
            warning.style.visibility = "hidden";
            this.setState({
                term:'',
                items: [...this.state.items,this.state.term]
            });
        }
    }
    delete(item)
    {
        this.setState(prevState => ({
            items: prevState.items.filter(el => el != item)
        }));
    }
    
    render() {
        return(
          <div className="App">
            <h1> To-Do List: </h1>
            <form className="table" onSubmit={this.onSubmit}>
                <input value={this.state.term} onChange={this.onChange}/>
                <p id="warning"> Please type in an item to add it to the To-Do list! </p> 
                <button>Submit</button>
            </form>
            <p></p>
            <div className = "tableDiv">
                <Table items = {this.state.items} delete = {this.delete.bind(this)}/>
            </div>
          </div>
        );
    }
}

export default App;
