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

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dateOfIssue: '',
      notes: '',
      total: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
    };
    this.state.items = [
    
      {
        REFERENCE : '',
        id: 0,
        name: '',
        DESCRIPTION: '',
        P_U: '1.00',
        QUANTITE: 1,
        MONTANT :'0.00'
      }
    ];
    this.editField = this.editField.bind(this);
  }
  componentDidMount(prevProps) {
    this.handleCalculateTotal()
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  };
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      REFERENCE : '',
      id: id,
      name: '',
      DESCRIPTION: '',
      P_U: '1.00',
      QUANTITE: 1,
      MONTANT: '0.00',
    }
    this.state.items.push(items);
    this.setState(this.state.items);
  }
  handleCalculateTotal() {
    var items = this.state.items;
    var MONTANT = 0;
    // items.map(function(items) {
    //   MONTANT = parseFloat(MONTANT + (parseFloat(items.PRIX_UNITAIRE).toFixed(2) * parseInt(items.QUANTITE))).toFixed(2)
    // });
   let x = items.map((p) => p.P_U*p.QUANTITE);
   MONTANT =  x.reduce((acc, curr) => acc + curr, 0)
    this.setState({
      MONTANT: parseFloat(MONTANT).toFixed(2)  }, () => {
  
      this.setState({
        taxAmmount: parseFloat(parseFloat(MONTANT) * (this.state.taxRate / 100)).toFixed(2)
      }, () => {
       
          this.setState({
            total: (MONTANT  + parseFloat(this.state.taxAmmount))
          });
        });
      });


  };
  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    console.log(items)
    var newItems = items.map(function(items) {        

      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    })
    this.setState({items: newItems});
    this.handleCalculateTotal();
  };
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };
 
  openModal = (event) => {
    event.preventDefault()
    this.handleCalculateTotal()
    this.setState({isOpen: true})
  };
  closeModal = (event) => this.setState({isOpen: false});

  render() {  

    return (<Form onSubmit={this.openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div class="d-flex flex-column">
                
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">&nbsp;La date de la facture:</span>
                  <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => this.editField(event)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div><br/>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">&nbsp;Date d'expédition:</span>
                  <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => this.editField(event)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div>
              </div>
              <Row className="mb-5">
              <Col>
                
                <Form.Control placeholder={"N° Bon de Commande"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
              <Col>
                
                <Form.Control placeholder={"Mode de paiement"} value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
            <Form.Select  className="btn btn-light my-1" aria-label="Clients">
                <option > Clients</option>
              
              </Form.Select>
            
            </Row>
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
    </Form>)
  }
}

export default InvoiceForm;
