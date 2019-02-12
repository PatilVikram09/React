import React, { Component } from 'react';
import ProductService from "./../../services/service.js";

class ProductUIComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            _id:0,
            ProductId:0,
            ProductName:"",
            Price:0,
            CategoryName:"",
            Manufacturer:"",
            Products:[],
            Categories:['Electronic','Electrical', 'Food'],
            Manufacturers:['AB Tech', 'CD Power','EF Beberages'],
            CriteriaName: "",
            Criteria: ["ProductId","ProductName","Price","CategoryName","Manufacturer"]
        };

        this.serv = new ProductService();
    }

    // e is an event-payload raised on target element
    //we can read the payload data using 'e'
    onChangeProduct(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }


    onClickClear(e){
        this.setState({_id: 0});
        this.setState({ProductId: 0});
        this.setState({ProductName: ""});
        this.setState({Price: 0});
        this.setState({CategoryName: ""});
        this.setState({Manufacturer: ""});   
    }

    onClickSave(e){
       // alert(`${this.state.ProductId} ${this.state.ProductName} ${this.state.Price} 
        //${this.state.CategoryName} ${this.state.Manufacturer}`);

        //console.log(this.state._id)
        if(this.state._id==0){
            let prd = {
                ProductId:this.state.ProductId,
                ProductName: this.state.ProductName,
                Price: this.state.Price,
                CategoryName:this.state.CategoryName ,
                Manufacturer:this.state.Manufacturer
            };

            this.serv.postData(prd)
                            .then(res=>res.json())
                            .then(
                                resp=>resp.data,
                                
                                )
                            .catch(error=>console.log(error.status));
        }
        else{
            let prd = {
                ProductId:this.state.ProductId,
                ProductName: this.state.ProductName,
                Price: this.state.Price,
                CategoryName:this.state.CategoryName ,
                Manufacturer:this.state.Manufacturer
            };

            this.serv.putData(prd,this.state.ProductId)
                            .then(res=>res.json())
                            .then(resp=>resp.data)
                            .catch(error=>console.log(error.status));
        }
        
    }

    getSelectedProduct(p){
        this.setState({_id: p._id});
        this.setState({ProductId: p.ProductId});
        this.setState({ProductName: p.ProductName});
        this.setState({Price: p.Price});
        this.setState({CategoryName:p.CategoryName});
        this.setState({Manufacturer: p.Manufacturer});
    }

    onClickDelete(id){
        this.serv.deleteData(id)
                        .then(res=>res.json())
                        .then(resp=>resp.data)
                        .catch(error=>console.log(error.status));
    }

    //method will be executed immediately after the render() complete the job
    componentDidMount(){
        let prds = this.serv.getData()
                            .then((data) => data.json())
                            .then((value)=>{
                               //console.log(JSON.stringify(value.data));
                               this.setState({Products:value.data})
                            })
                            .catch(error =>{
                                console.log(`Error Status ${error.status}`);
                            });
    }

    onChangeCriteria(e){
        this.setState(
            {CriteriaName: e.target.value}
        )
    }

    onChangeSort(e){
        this.setState({[e.target.name]: e.target.value})
    }
    onChangeReverse(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onClickSort(e){
        let pro = this.state.Products;
        let criteria = this.state.CriteriaName;

        pro.sort(function(a,b){
            if(typeof a[criteria]== "string"){
                return a[criteria].toLowerCase().localeCompare(b[criteria].toLowerCase());
            }else{
                return a[criteria]-b[criteria];
            }
        });
        this.setState({Products: pro})
    }

    onClickReverse(e){
        let pro = this.state.Products;
        let criteriaType = this.state.CriteriaName;

        pro.reverse();
        this.setState({Products: pro})
    }
    
    render() { 
        return ( 
            <div className="container">
                    <div className="form-group">
                        <label htmlFor="ProductId">ProductId</label>
                        <input type="text" className="form-control" name="ProductId" value={this.state.ProductId} onChange={this.onChangeProduct.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ProductName">Product Name</label>
                        <input type="text" className="form-control" name="ProductName" value={this.state.ProductName} onChange={this.onChangeProduct.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input type="text" className="form-control" name="Price" value={this.state.Price} onChange={this.onChangeProduct.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="CategoryName">Category Name</label>
                        <select className="form-control" name="CategoryName" value={this.state.CategoryName} onChange={this.onChangeProduct.bind(this)}>
                            { this.state.Categories.map((c, i) => 
                                <Options key={i} data={c}></Options>
                            )}


                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Manufacturer">Manufacturer</label>
                        <select className="form-control" name="Manufacturer" value={this.state.Manufacturer} onChange={this.onChangeProduct.bind(this)}>
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
                                        <input type="button" value="Submit" className="btn btn-submit" onClick={this.onClickSave.bind(this)}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>

                    <div className="container">
                        <div className="form-group">
                            <label htmlFor="CriteriaName">Criteria</label>
                            <select className="form-control" name="CriteriaName" value={this.state.CriteriaName} onChange={this.onChangeCriteria.bind(this)}>
                                { this.state.Criteria.map((c, i) => 
                                    <Options key={i} data={c}></Options>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="radio" name="radiobtn" value="SORT" onChange={this.onChangeSort.bind(this)}
                                            onClick={this.onClickSort.bind(this)}/> SORT
                            
                        </div>
                        <div className="form-group">
                            <input type="radio" name="radiobtn" value="REVERSE" onChange={this.onChangeReverse.bind(this)}
                                            onClick = {this.onClickReverse.bind(this)} /> REVERSE
                            
                        </div>
                    </div>

                    <div className="container">
                       <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {
                                        this.state.Products.length >0?
                                        Object.keys(this.state.Products[0]).map((p, i) => (
                                            <th> {p} </th>
                                        ))
                                        :null
                                       
                                    }
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    this.state.Products.map((prod, idx) => (
                                        <TableRow key={idx}  row={prod} deleteData={this.onClickDelete.bind(this)} selected={this.getSelectedProduct.bind(this)} products={this.state.Products}></TableRow>
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

    delete(){
       this.props.deleteData(this.props.row.ProductId)
    }

    render(){
        return(
            <tr>
                {
                    Object.keys(this.props.products[0]).map((p, i) => (
                        <td> {this.props.row[p]}</td>
                    ))
                }
                <div>   
                    <input className="btn btn-primary" type="button" onClick={this.onRowClick.bind(this)} value="Edit" />

                    <input className="btn btn-danger" type="button" onClick={this.delete.bind(this)} value="Delete" />
                </div>
            </tr>
        );
    }
}

 
export default ProductUIComponent;