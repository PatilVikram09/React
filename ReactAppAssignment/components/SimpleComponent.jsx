import React, { Component } from 'react';

class SimpleComponents extends Component{

    //constructor will be used for state defination to accept data from parent component
    //the "props" represent data to received from the parent component
    constructor(props){
        super(props);
        //state declartion
        //event-binding to component
    }

    //the render() method encapsulate DOM and its data with behavior
    //this return the DOM object aka virtual DOM
    render(){
        return(
            <div>
                <h2>Simple Component</h2>

                <br/>
                <NewComponent/>
            </div>
        );
    }

}

class NewComponent extends Component{
    render(){
        return(
            <div>
                <h2>The New Component</h2>
            </div>
        ); 
    }
}

export default SimpleComponents;
