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
    
    render()
    {
        return(
            <table>
                <tbody>
                {
                    this.props.items.map((item) => <tr key = {item}><td id = {item} className = "unchecked"> <input type="checkbox" onClick={() => this.crossOut(item)}/> {item}</td>
                    </tr>
                    )
                }   
                </tbody>
            </table>
        
        );
    }
}

export default Table;