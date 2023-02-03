import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    console.log(this.props.items)

    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function(item) {
     
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} />
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Nouveau Produit</th>
              <th>QTY</th>
              <th>PRIX</th>
              <th className="text-center">SUP</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Ajouter Produit</Button>
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
        <td style={{width: '100%'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: this.props.item.name,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "DESCRIPTION",
            placeholder: "Item description",
            value: this.props.item.DESCRIPTION,
            id: this.props.item.id
          }}/>
        </td>
        <td style={{minWidth: '70px'}}>
          <EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "QUANTITE",
            min: 1,
            step: "1",
            value: this.props.item.QUANTITE,
            id: this.props.item.id,
          }}/>
        </td>
        <td style={{minWidth: '130px'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "number",
            name: "P_U",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: this.props.item.P_U,
            id: this.props.item.id,
          }}/>
        </td>
        <td className="text-center" style={{minWidth: '50px'}}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
        </td>
      </tr>
    );

  }

}

export default InvoiceItem;