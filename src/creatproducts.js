import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import Axios from 'axios';
import {Link} from 'react-router-dom'

class creatproduct extends React.Component {
  constructor(props) {
    super(props);
   
  }
  

  render() {  



    return (<>
    <Form onSubmit={this.openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
         
                    
             {/* <input value={this.state.client.Rc} onChange={(e)=> console.log('t',e.target.value)}/> */}

            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} items={this.state.items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">SOUS-TOTAL:
                  </span>
                  <span>
                    {this.state.MONTANT}</span>
                </div>
              
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">T.V.A:
                  </span>
                  <span>
                    <span className="small ">({this.state.taxRate || 0}%)</span>
                    {this.state.taxAmmount || 0}</span>
                </div>
                <hr/>
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total:
                  </span>
                  <span className="fw-bold">
                    {this.state.total || 0}</span>
                </div>
              </Col>
            </Row>
            <hr className="my-4"/>
            <Form.Label className="fw-bold">Remarque:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes" value={this.state.notes} onChange={(event) => this.editField(event)} as="textarea" className="my-2" rows={1}/>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
          <Button variant="primary" type="submit" className="d-block w-100">Revoir la Facture</Button>
<button onClick={this.ajouterfacture}>Ajouter Facture</button>
            <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items}  MONTANT={this.state.MONTANT} taxAmmount={this.state.taxAmmount}  total={this.state.total}/>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Devise:</Form.Label>
              <Form.Select  className="btn btn-light my-1" aria-label="Change Currency">
                <option value="DH"> MAD(dirham marocain)</option>
              
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">TAUX DE T.V.A:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="taxRate" type="number" value={this.state.taxRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            
          </div>
        </Col>
      </Row>
    </Form>
    </>
    )
  }
}

export default creatproduct;
