import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './createInvoice';
import AddClient from './addClient';
import Createproduct from './creatproducts';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
  return (<>
   
      <Routes>    
      <Route path='/nvclient' element={<AddClient/>}/>  
      <Route path='/createproduct' element={<Createproduct/>}/>  
      
 </Routes>  
 <div className="App d-flex flex-column  justify-content-center w-100">
       <Container>
        <InvoiceForm/>
      </Container> 
    

 </div>
     

 </> );
}}

export default App;