import React, { Component } from 'react';
import './index.css';

class Table extends Component{
    constructor(props)
    {
        super(props);
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
                    this.props.items.map((item) => <tr key = {item}><td id = {item} className = "unchecked"> <input type="checkbox" onClick={() => this.crossOut(item)}/> {item} </td><td> <button className = "delete" onClick={this.delete.bind(this,item)}> Delete </button></td>
                    </tr>
                    )
                }   
                </tbody>
            </table>
        
        );
    }
}


export default Table;