import React, { Component } from 'react';
import Table from './TaskTable.js';
import DATA from './data.js';
import './App.css';

class App extends Component {
    constructor(props)
    {
        //console.log(DATA.items);
        super(props);
        this.state = {
            term: '',
            error: null,
            items: [],
            checked: [],
            testing: []

        };
        this.dumbStuff = {
            list: [],
            c: []
        };
        //this.loadListItems();
    }
    
    componentDidMount() 
    {
        //this.loadListItems();
        this.printItemList();
        console.log(this.dumbStuff.c);

    }

    printItemList = async () =>
    {
        const testItems = await this.loadItemsDiff();
        const stuff = await testItems.json();
        console.log(stuff);
        return testItems;
    }
    loadListItems = () =>
    {
        fetch('/api/items')
            .then(data => data.json())
            .then((res) => 
            {
                if(!res.success) this.setState({error: res.error});
                else this.setState({testing: res.data});
                //console.log(res.data.item);
                for(var i in res.data)
                {
                    //console.log(this.state.testing[i].item);
                    this.setState(
                        {
                            items: [...this.state.items,res.data[i].item],
                            checked: [...this.state.checked,res.data[i].checked]
                        });
                }
            });
    }

    loadItemsDiff = () =>
    {
        fetch('/api/items')
            .then(data => data.json())
            .then((res) => 
            {
                var newItems = [];
                var newChecked = [];
                if(!res.success) this.setState({error: res.error});
                for(var i in res.data)
                {
                    newChecked.push(res.data[i].checked);
                }
                this.dumbStuff.c = newChecked;
                console.log("ItemsDiff: " + newChecked);
                return res.data;
            });
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
                <Table items = {this.state.items} checked = {this.state.checked} delete = {this.delete.bind(this)}/>
            </div>
          </div>
        );
    }
}

export default App;
