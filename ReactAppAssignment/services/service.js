class ProductService{

    getData(){
        let promise = fetch("http://localhost:4070/api/products");
        return promise;
    }

    postData(prd){
        let promise = fetch("http://localhost:4070/api/products", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json"
                                },
                                body:JSON.stringify(prd)
                            });
        return promise;
    }

    deleteData(id){
        //console.log("In service : "+id)
        let promise = fetch("http://localhost:4070/api/products/"+ id, {
            method : "DELETE",
        });
        return promise;
    }

    putData(prd, id){
        ///console.log("Prd :"+ JSON.stringify(prd), id)
        let promise = fetch("http://localhost:4070/api/products/"+ id, {
            method : "PUT", 
            headers : {
            "content-type":"application/json"
            },
            body : JSON.stringify(prd)
        });
        return promise;
    }
}

export default ProductService