import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './createInvoice';

class App extends Component {
  render() {
  return (
    <div className="App d-flex flex-column  justify-content-center w-100">
      <Container>
        <InvoiceForm/>
      </Container>
    </div>
  );
}}

export default App;