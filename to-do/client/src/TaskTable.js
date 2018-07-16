import React, { Component } from 'react';
import './index.css';

class Table extends Component{
    constructor(props)
    {
        super(props);
        //console.log(props);
    }
    
    crossOut(item)
    {
        var itemName = document.getElementById(item);
        if(itemName.className == "unchecked")
        {
            itemName.className = "checked";
        }
        else
        {
            itemName.className = "unchecked";
        }
    }
    
    componentDidMount()
    {
        console.log("got here");
        var i;
        var allboxes = document.getElementsByClassName("checkbox");
        var allItems = document.getElementsByName("unchecked");
        console.log(allItems.length);
        for(i = 0; i < allboxes.length; i++)
        {
            if(this.props.checked[i] == 1)
            {
                //console.log(allItems[i]);
                allItems[i].className = "checked";
                allboxes[i].checked = true;
            }
            console.log(this.props.checked[i]);
            console.log(allItems[i]);
        }
    }
    
    delete(item)
    {
        this.props.delete(item);
    }
    
    render()
    {
        return(
            <table>
                <tbody>
                {
                    this.props.items.map((item, index) => <tr key = {item}><td id = {item} className = "unchecked" name="unchecked"> <input type="checkbox" className = "checkbox" onClick={() => this.crossOut(item)}/> {item} </td><td> <button className = "delete" onClick={this.delete.bind(this,item)}> Delete </button></td>
                    </tr>
                    )
                }   
                </tbody>
            </table>
        
        );
    }
}


export default Table;