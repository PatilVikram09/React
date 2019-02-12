import React, { Component } from 'react';

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            ProductId:0,
            ProductName:"",
            Price:0,
            CategoryName:"",
            Manufacturer:"",
            Products:[
                    {ProductId:101, ProductName:"laptop", Price:29999, CategoryName:"Electronics", Manufacturer:"Ab Tech"},
                    {ProductId:102, ProductName:"Desktop", Price:16000, CategoryName:"Electronics", Manufacturer:"EF Beberages"},
                    ],
            Categories:['Electronic','Electrical', 'Food'],
            Manufacturers:['AB Tech', 'CD Power','EF Beberages']
        };
    }

    // e is an event-payload raised on target element
    //we can read the payload data using 'e'
    onChangeProductId(e){
        this.setState({ProductId:e.target.value});
    }

    onChangeProductName(e){
        this.setState({ProductName:e.target.value});
    }

    onChangePrice(e){
        this.setState({Price:e.target.value});
    }

    onChangeCategoryName(e){
        this.setState({CategoryName:e.target.value});
    }

    onChangeManufacturer(e){
        this.setState({Manufacturer:e.target.value});
    }

    onClickClear(e){
        this.setState({ProductId: 0});
        this.setState({ProductName: ""});
        this.setState({Price: 0});
        this.setState({CategoryName: ""});
        this.setState({Manufacturer: ""});   
    }

    onClickSave(e){
        alert(`${this.state.ProductId} ${this.state.ProductName} ${this.state.Price} 
        ${this.state.CategoryName} ${this.state.Manufacturer}`);

        //1. get the copy of Products array using slice()
        let tempArray = this.state.Products.slice();

        //2. push the new record in to tempArray
        tempArray.push({
            ProductId:this.state.ProductId,
            ProductName: this.state.ProductName,
            Price: this.state.Price,
            CategoryName:this.state.CategoryName ,
            Manufacturer:this.state.Manufacturer
        })

        //3. copy the tempArray into Products array
        this.setState({Products:tempArray});
    }

    getSelectedProduct(p){
        this.setState({ProductId: p.ProductId});
        this.setState({ProductName: p.ProductName});
        this.setState({Price: p.Price});
        this.setState({CategoryName:p.CategoryName});
        this.setState({Manufacturer: p.Manufacturer});
    }


    
    render() { 
        return ( 
            <div className="container">
                    <div className="form-group">
                        <label htmlFor="ProductId">ProductId</label>
                        <input type="text" className="form-control" value={this.state.ProductId} onChange={this.onChangeProductId.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ProductName">Product Name</label>
                        <input type="text" className="form-control" value={this.state.ProductName} onChange={this.onChangeProductName.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input type="text" className="form-control" value={this.state.Price} onChange={this.onChangePrice.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="CategoryName">Category Name</label>
                        <select className="form-control" value={this.state.CategoryName} onChange={this.onChangeCategoryName.bind(this)}>
                        { this.state.Categories.map((c, i) => 
                            <Options key={i} data={c}></Options>
                        )}


                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Manufacturer">Manufacturer</label>
                        <select className="form-control" value={this.state.Manufacturer} onChange={this.onChangeManufacturer.bind(this)}>
                        {
                            this.state.Manufacturers.map((m, i) =>(
                                 <Options key={i} data={m}></Options>
                            ))
                        }
                        </select>
                    </div>

                    <div className="form-group">
                        <table className="table table-bordered table-stripped">
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="button" value="New" className="btn btn-default" onClick={this.onClickClear.bind(this)}/>
                                    </td>
                                    <td>
                                        <input type="button" value="Save" className="btn btn-submit" onClick={this.onClickSave.bind(this)}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>

                    <div className="container">

                        <table className="table table-bordered table-stripped">
                            <thead>
                                <tr>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th> Price</th>
                                    <th> CategoryName</th>
                                    <th>Manufacturer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Products.map((prd,idx)=>(
                                        <TableRow keys={idx} row={prd} selected={this.getSelectedProduct.bind(this)}/>
                                    ))
                                }
                            </tbody>
                        </table> 
                    </div>
            </div>

         );
    }
}
//component that will render <option></option>
//props.data is the passed from the parent of this component
class Options extends Component{
    
    render(){
        return (
            <option value= { this.props.data }> { this.props.data } </option>
        );
    }
}

class TableRow extends Component{

    constructor(props){
        super(props);
    }

    //a new selected method is used to passed received data
    onRowClick(){
        this.props.selected(this.props.row);
    }

    render(){
        return(
            <tr onClick={this.onRowClick.bind(this)}>
                <td>{this.props.row.ProductId}</td>
                <td>{this.props.row.ProductName}</td>
                <td>{this.props.row.Price}</td>
                <td>{this.props.row.CategoryName}</td>
                <td>{this.props.row.Manufacturer}</td>
            </tr>
        );
    }
}

 
export default ProductComponent;