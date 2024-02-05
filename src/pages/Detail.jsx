import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";





   
 const BookDetailPage = () =>{

const firebase = useFirebase();
const params = useParams();
    console.log(params);
const [data, setData] = useState(null);
const [url, setURL] = useState((null));
const [qty, setQty] = useState(1);




console.log(data);

useEffect(()=>{
    firebase.getBookById(params.bookId).then((value)=> setData(value.data()));
},[]);
useEffect(()=>{
    if(data){
        const imageURL = data.imageURL; 
        firebase.getImageURL(imageURL).then((url)=> setURL(url))
    }
    
},[data]);

const placeOrder = async () =>{
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log("order placedddd",result);
   
}

if(data==null){
    return <h1>Loading...</h1>
}
    return (
        <div className="container mt-5">
            <h1>{data.name}</h1>
            <img src={url} alt="" width="50%" style={{borderRadius:"10px"}}/>
            <h1>Details</h1>
            <h4>Price: Rs. {data.price}</h4>
            <h1>Owner Details</h1>
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>
            <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Qty</Form.Label>
          <Form.Control onChange={(e) => { setQty(e.target.value) }} value={qty} type="number" placeholder="Enter Qty" />
        </Form.Group>
            <Button variant="success" onClick={placeOrder} >Buy now</Button>
        </div> 
    )
}

export default BookDetailPage;