import React, { Component } from 'react';
import './index.css';

class Table extends Component{
    constructor(props)
    {
        super(props);
    }
    
    crossOut = (item) =>
    {
        
    }
    
    render()
    {
        return(
            <table>
                <tbody>
                {
                    this.props.items.map((item) => <tr key = {item} id = {item}><td> <input type="checkbox" value="items" onChange={this.crossOut({item})}/> {item}</td>
                    </tr>
                    )
                }   
                </tbody>
            </table>
        
        );
    }
}

export default Table;