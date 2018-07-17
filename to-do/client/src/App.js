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
            checked: []

        };
        this.dumbStuff = {
            list: [],
            c: []
        };
        //this.loadListItems();
        this.printItemList();
    }
    
    componentDidMount() 
    {

    }

    componentWillUnmount()
    {

    }

    printItemList = async() =>
    {
        const promise = await this.loadListItems();
        //This is where you can get stuff from the await
        //console.log(this.dumbStuff.c);
        //console.log(this.dumbStuff.list);
        return promise;
    }
    loadListItems = () =>
    {
        fetch('/api/items')
            .then(data => data.json())
            .then((res) => 
            {
                if(!res.success) this.setState({error: res.error});
                else
                {
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
                }
                return this.state;
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
            const {term} = this.state;
            const item = term;
            const checked = 0;
            fetch('/api/items', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({item, checked}),
            }).then(res => res.json()).then((res) => {
                if(!res.success) this.setState({error: res.error.message || res.error});
                else this.setState({
                    term: '',
                    items: [...this.state.items,this.state.term]
                });
            });
        }
    }
    delete(item)
    {
        fetch('/api/items', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({item}),
        }).then(res => res.json()).then((res) => {
            if(!res.success) this.setState({error: res.error.message || res.error});
        });
        this.setState(prevState => ({
            items: prevState.items.filter(el => el != item)
        }));
    }
    put(item,checked)
    {
        console.log("Put: " + item + " : " + checked);
        fetch('/api/items', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({item,checked}),
        }).then(res => res.json()).then((res) => {
            if(!res.success) this.setState({error: res.error.message || res.error});
        });
    }
    render() {
        //console.log("got to the render part");
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
                <Table items = {this.state.items} checked = {this.state.checked} delete = {this.delete.bind(this)} put = {this.put.bind(this)}/>
            </div>
          </div>
        );
    }
}

export default App;
