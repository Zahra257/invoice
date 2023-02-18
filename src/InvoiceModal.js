
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import pdfMake from "pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React, { useState, useEffect } from 'react';

pdfMake.vfs = pdfFonts.pdfMake.vfs


const InvoiceModal = (props)=>{
  console.log(props.facture?.date_dexpidition)
  console.log(props)
  console.log(props.facture?.id)
  let items =[{REFERENCE :'kjkj', DESCRIPTION:'kjbkjb',QUANTITE:'jnln',P_U:'jn',MONTANT:'bhkkjhb'}]

  function buildTableBody(data, columns) {
    var body =[];
  

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push({text : row[column].toString(), fontSize: 9}
            );
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
    return {
        table: {
            headerRows: 1,
            layout: 'customHorizontalLines',
            style: 'tableHeader',
            widths: ["15%", "46%", "13%", "13%", "13%"],
            body: buildTableBody(data ,columns),

        }
    };
}
  const docDefinition = {
    pageMargins: [ 40, 40, 40, 150 ],

  
 
    // content: [
    //   {text: `This is a header ${Math.random()*100}`, style: 'header'},
    //   'No styling here, this is a standard paragraph',
    //   {text: 'Another text', style: 'anotherStyle'},
    //   {text: 'Multiple styles applied', style: ['header', 'anotherStyle']},
    // ],

      // content: [
      //   {
      //     toc: {
      //       title: {text: 'INDEX', style: 'header'}
      //     }
      //   },
      //   {
      //     text: 'This is a header',
      //     style: 'header',
      //     tocItem: true
      //   }
      // ],
     
        // header: function(currentPage, pageCount, pageSize) {
  //   // you can apply any logic and return any valid pdfmake element

  //   return [
  //     { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
  //     { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
  //   ]
  // },
  
  // content: [
  //   {
  //     layout: 'lightHorizontalLines', // optional
  //     table: {
  //       // headers are automatically repeated if the table spans over multiple pages
  //       // you can declare how many rows should be treated as headers
  //       headerRows: 1,
  //       widths: [ '*', 'auto', 100, '*' ],

  //       body: [
  //         [ 'First', 'Second', 'Third', 'The last one' ],
  //         [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
  //         [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
  //       ]
  //     }
  //   }
  // ],  header: { text: 'MLB World Series Winners', alignment: 'center' },
 
  content: 
  	[                  	           


                                { text: '\n\nFACTURE', style: 'header' },
                             {   columns: [
                                  {
                                    width: 100,
                                    fontSize: 10,
                                    text: '\n DATE :\n N° FACTURE :',
                                  },
                                  [
                                    {
                                      width: 100,
                                      fontSize: 10,
                                      text: `\n ${props.facture?.CreateAt} \n ${props.facture?.facture_id} \n\n`,
                                       style: 'header2'
                                      }
                                  ]
                              ]}, 
                                {   columns: [
                                {
                                  width: 100,
                                  fontSize: 11,
                                  text: 'FACTURÉ À :',
                                },
                                [
                                  {
                                    width: 100,
                                    fontSize: 10,
                                    text: `${props.facture?.name} - ${props.facture?.Rc} - ${props.facture?.adress} `,
                                     style: 'header3'
                                    }
                                ]
                            ]},'\n','\n',
            
                   
                 
                  
             
            
              { text: "\nCommentaires ou instructions spéciales :\n\n" , style: 'Commentaires' },
              {
                style: 'tableExample',
                layout: 'customHorizontalLines',
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ["*", "*", "*" ],

                    body: [
                      [{ text: "N° BON DE COMMANDE", style: 'tableHeader' }, { text: "DATE D'EXPEDITION", style: 'tableHeader' },{ text: "MODE DE PAIEMENT", style: 'tableHeader' }],

                        [{text: `${props.facture?.N_bon_de_commande}`, style: 'tableHeader'},{text: `${props.facture?.date_dexpidition
                        }`, style: 'tableHeader'} ,{text: `${props.facture?.mode_de_payement}`, style: 'tableHeader'}],

                    ]

            },                }   ,     

            '\n', 
                  	{
                  	    style: 'tableHeader',
                  	    table: {
                  	        // headers are automatically repeated if the table spans over multiple pages
                  	        // you can declare how many rows should be treated as headers
                            
                  	        headerRows: 1,
                  	        widths: ["15%", "45%", "13%", "13%", "13%"],
                  	        body: [
                              [],
                              
                  	        ]
                  	    }
                  	},'\n',                               table(items, [ 'REFERENCE', 'DESCRIPTION','QUANTITE','P_U','MONTANT'] ),

                    // {
                    //   style: 'total',
                    //   layout: 'customHorizontalLines',

                    //   //  margin :  [ 40,0,0,0] ,
                    //   table: {
                    //     body: [
                    //       ['SOUS-TOTAL',{text: '5000', style: 'tableHeader'
                    //     }],
                    //       ['T.V.A', {text: '5000', style: 'tableHeader'}],
                    //       ['TOTAL', {text: '5000', style: 'tableHeader'}]

                    //     ]
                    //   }
                    // },
                    '\n',
                    {
                      style: 'tableExample',
                      layout: 'customHorizontalLines',
                      table: {
                          // headers are automatically repeated if the table spans over multiple pages
                          // you can declare how many rows should be treated as headers
                          headerRows: 1,
                          widths: ["50%", "50%"],
                          body: [

                            [{text: 'SOUS-TOTAL', style: 'tableHeader'},{text: `${props.MONTANT}`, style: 'tableHeader'}],
                            [{text: 'T.V.A', style: 'tableHeader'},{text:  `${props.taxAmmount}`, style: 'tableHeader'}],
                            [{text: 'TOTAL', style: 'tableHeader'},{text:  `${props.total}`, style: 'tableHeader'}],
                                             
                          ]
                      }
                  },'\n' ,   
                
                  
                      
  
              ], 
    styles: {
    table :{
      margin: [0, 0, 0, 200]

    },
      total:{
        bold: true,
        fontSize: 12,

      },
      tableHeader:{
        fontSize:10, 
        bold: true,
        alignment:'center', 
      },
      Commentaires:{
        fontSize: 10,
        bold: true,

      },    
      header3: {
        fontSize: 12,
        bold: true,
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
      header: {
        fontSize: 30,
        bold: true,
        italics: true,
        alignment: 'right',

      },
    },
  };


  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);

    pdfGenerator.download()
  }

  return(
    <>
     <button onClick={createPdf}>Generate PDF</button>
     
    </>
  )
}
export default InvoiceModal

// var dd = {
// 	content: 
// 	[

//                 {
//                     columns: [
                       
//                     {

//                         text: [
//                               { text: 'abcdde', style: 'header' },
//                               '\n 123456789 \n abc@gmail.com \n newyork XXXXXXXXX',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                               '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
//                         ],
//                         style: 'normal'
//                     }
                    

//                     ]
//             },
//             '\n',
               
                
//                 	{
//                 	    style: 'tableExample',
//                 	    layout: 'customHorizontalLines',
//                 	    table: {
//                 	        // headers are automatically repeated if the table spans over multiple pages
//                 	        // you can declare how many rows should be treated as headers
//                 	        headerRows: 1,
//                 	        widths: ["16%", "16%", "16%", "16%", "16%", "*"],
//                 	        body: [
//                               [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }, { text: 'Header 4', style: 'tableHeader' }, { text: 'Header 5', style: 'tableHeader' }, { text: 'Header 6', style: 'tableHeader' }],
//                               ["5000", "4500", "5100", "1500", "9600",],
//                               ["5000", "4500", "5100", "1500", "9600",],
//                                ["5000", "4500", "5100", "1500", "9600",],
//                                 ["5000", "4500", "5100", "1500", "9600",],
//                               ["5000", "4500", "5100", "1500", "9600",]
//                 	        ]
//                 	    }
//                 	}
                    

//             ],
            
//              styles: {
               
//                 normal: {
//                     fontSize: 10,
                    
//                     margin: [0, 0, 0, 10],
//                     lineHeight: 1.25
//                 },
                
//                 header: {
//                     fontSize: 12,
//                     bold: true,
//                     margin: [0, 0, 0, 10],
//                     lineHeight: 1.25
//                 }
               

//             }
//         }
      



//pdfMake.createPdf(docDefinition).print();

    //  }
//function GenerateInvoice() {
  //var date = new Date();

//   html2canvas(
//   	// Increase the quality by properly scaling the image
//   	 document.querySelector("#invoiceCapture"),{scale: 2}).then((canvas) => {
//     const imgObj = {
//       image : canvas.toDataURL('image/png'),
//       width: 595,
      
//     };

//     const documentDefinition = {
//       content: [imgObj],
//       defaultStyle: {
//         font: "NimbusSans"
//       },
//       pageSize: "A4",
//       pageOrientation: "P",
//       pageMargins: [0, 0, 0, 0]
//     };
//     const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
//     pdfDocGenerator.download();
//   });
// };


  //  var imgData = canvas.toDataURL('image/png');
  //  var imgWidth = 210;
   // var pageHeight = 295;
 //   var imgHeight = canvas.height * imgWidth / canvas.width;
   // var heightLeft = imgHeight;

    // var doc = new jsPDF('p', 'mm', "a4");
    // var position = 0;
    // doc.internal.scaleFactor = 30;

    // doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+0);
    // heightLeft -= pageHeight;

    // while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight;
    //     doc.addPage();
    //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+0);
    //     heightLeft -= pageHeight;
    // }
    //   doc.save ('facture'+ '_'+date.getTime()+'.pdf')

  
 // });
//}

//class InvoiceModal extends React.Component {
//  constructor(props) {
 //   super(props);
 // }
 // render() {
   // return(
      //<div>
      //  <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
        //  <div id="invoiceCapture">
         //   <div className="d-flex flex-row justify-content-between align-items-start w-100 p-4">
          //    <div className="w-100">
             //   <h4 className="fw-bold my-2"></h4>
               // <h6 className="fw-bold text-secondary mb-1">
              //  </h6>
            //  </div>
            //  <div className="text-end ms-4">
             //   <h6 className="fw-bold mt-1 mb-2">&nbsp;</h6>
              //  <h5 className="fw-bold text-secondary"> </h5>
          //    </div>
           // </div>
            {/* <Row className="mb-4">
                <Col md={4}>
                 
                </Col>
                <Col md={4}>
                  
                </Col>
                <Col md={4}>
                  <h1 className="fw-bold mt-2">FACTURE</h1>
                </Col>
              </Row>
            <div className="p-4 mt-1">
            <b>DATE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.info.dateOfIssue||''}<br/>
            <b>N° FACTURE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.info.invoiceNumber||''}<br/>
            <b>Facturé à &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ this.props.info.billTo||''}
                
                 
         
            </div> 
            <div className="p-4">*/}
         {/* /  <h6 style={{'fontSize':'14px'}}>Commentaires ou instructions spéciales :</h6> */}
{/* <Table style={{  'border': '1px solid black', 'textAlign' :'center','fontSize':'12px'}}>
                  <thead>
                  <tr>
                    <th style={{'border': '1px solid black'}} >N° BON DE COMMANDE</th>
                    <th style={{'border': '1px solid black'}}>DATE D'EXPEDITION</th>
                    <th style={{'border': '1px  solid black'}}>MODE DE PAIEMENT</th>
                  </tr>
                </thead>
                <tbody>                
                      <tr>                
                        <td className="" style={{'width': '100px','border': '1px solid black'}}>-</td>
                        <td className="" style={{'width': '100px','border': '1px solid black'}}>-</td>
                        <td className="" style={{'width': '100px','border': '1px solid black'}}>-</td>
                      </tr>
                  
                
                </tbody>
</Table > */}
             
              {/* <Table id="styledTable" className="mb-0" style={{  'border': '1px solid black'
}}>
                <thead style={{'fontSize':'12px', 'textAlign' :'center', 'alignItem' : 'center',   
 }}>
                  <tr  >
                    <th style={{'border': '1px solid black'}}>1</th>
                    <th style={{'border': '1px solid black'}}>2</th>
                    <th style={{'border': '1px solid black'}}>3</th>
                    <th style={{'border': '1px solid black'}}>4</th>
                    <th style={{'border': '1px solid black'}}></th>
                  </tr>
                </thead>
                <tbody id="styledTable">
                  {this.props.items.map((item, i) => {
                    return (
                      <tr style={{'fontSize':'12px',  }} id={i} key={i}>
                        <td style={{'width': '100px', 'textAlign' :'center','border': '1px solid black'}}>- </td>
                       
                        <td style={{'table-layout': 'fixed','border': '1px solid black',
  'width': '100%', 'height' : 'auto'  }}>
                          {item.name} - {item.description}
                        </td>
                        <td  style={{  'width': '80px','textAlign' :'center' ,'border': '1px solid black'}}> {item.QUANTITE}</td>
                        <td style={{'width': '100px','textAlign' :'center', 'border': '1px solid black'}}> {item.PRIX_UNITAIRE}</td>
                        <td  style={{'width': '100px','textAlign' :'center','border': '1px solid black'}}> {item.PRIX_UNITAIRE * item.QUANTITE}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table> */}
              {/* <Table style={{'width': '30%', 'margin-left' : '70%'}}>
                <tbody style={{'fontSize':'12px' , }}>
                  <tr>
                    <td style={{'border-bottom': '1px solid black'}}>&nbsp;</td>
                    <td style={{'border-bottom': '1px solid black'}}>&nbsp;</td>
                  </tr>
                  <tr className="text-end" >
                    <td className="fw-bold" style={{'width': '150px','border': '1px solid black'}}>SOUS-TOTAL</td>
                    <td className="text-end" style={{'width': '100px','border': '1px solid black'}}> {this.props.MONTANT}</td>
                  </tr>
                    <tr className="text-end">
                      <td className="fw-bold" style={{'width': '100px','border': '1px solid black'}}>T.V.A</td>
                      <td className="text-end" style={{'width': '100px','border': '1px solid black'}}> {this.props.taxAmmount }</td>
                    </tr>
                               
                  <tr className="text-end">
                    <td className="fw-bold" style={{'width': '100px','border': '1px solid black'}}>TOTAL</td>
                    <td  style={{'width': '100px','border': '1px solid black'}}> {this.props.total}</td>
                  </tr>
                </tbody>
              </Table> */}
              {/* {this.props.info.notes &&
                <div className="bg-light py-3 px-4 rounded">
                  {this.props.info.notes}
                </div>}   </div>*/}
         // </div>
          
        //  <div className="pb-4 px-4">
          //  <Row>
             
            //  <Col md={6}>
              //  <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
               //   <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
                //  Télécharger
             //  // </Button>
            //  </Col>
           // </Row>
         // </div>
       // </Modal>
     //   <hr className="mt-4 mb-3"/>
    //  </div>
   // )
  //}
//}

//export default InvoiceModal;

// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
// import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf'

// function GenerateInvoice() {
//   const divToPrint = document.querySelector("#invoiceCapture");
//   html2canvas(divToPrint).then(canvas => {
//       const imgData = canvas.toDataURL('image/png');
//       const imgWidth = 575;
//       const pageHeight = 290;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       const doc = new jsPDF({   //create pdf
//               orientation: 'portrait',
//                unit: 'pt',
//                format: 'a4'
//             });      
//       let position = 0;
//       doc.addImage(imgData, 'PNG', 0, 0 , imgWidth, imgHeight + 25);
//       heightLeft -= pageHeight;
//       while (heightLeft >= 0) {
//           position = heightLeft - imgHeight;
//           doc.addPage();
//           doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 25);
//           heightLeft -= pageHeight;
//       }
//       doc.save('download.pdf'); var pdf = new jsPDF('l', 'in', 'a4');
//        pdf.internal.scaleFactor = 0;

       
//        pdf.addHTML(('#invoiceCapture')[0],  function () {
       
//            pdf.save('calendarName');
//        });
// })}


// // function GenerateInvoice() {
// //   html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {// THIS MODEL AS CANVA 
// //     const imgData = canvas.toDataURL('image/png', 1.0); //canva save as image
// //     const pdf = new jsPDF({   //create pdf
// //       orientation: 'portrait',
// //       unit: 'pt',
// //       format: 'a4'
// //     });
// //     pdf.internal.scaleFactor = 1; //Improve PDF quality
// //     const imgProps= pdf.getImageProperties(imgData); //getImagePropertiesFUNCTION OF CANVA TO DEFINE  100% width and auto height OF IMG
// //     const pdfWidth = pdf.internal.pageSize.getWidth(); //pdf Width 100% YOU CAN USE getHeight(); TO 100% 
// //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
// //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); //IMAGE INSIDE PDF URL FORMAT MARGINLEFT AND TOP AND WIDTH AND HIGHT OF IMAGE 
// //     pdf.save('invoice-001.pdf'); //TELECHERGER
// //   })}




// class InvoiceModal extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return(
//       <div>
//         <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
//           <div id="invoiceCapture">
//             <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
//               <div className="w-100">
//                 <h4 className="fw-bold my-2">{this.props.info.billFrom||'John Uberbacher'}</h4>
//                 <h6 className="fw-bold text-secondary mb-1">
//                   Invoice #: {this.props.info.invoiceNumber||''}
//                 </h6>
//               </div>
//               <div className="text-end ms-4">
//                 <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
//                 <h5 className="fw-bold text-secondary"> {this.props.total}</h5>
//               </div>
//             </div>
//             <div className="p-4">
//               <Row className="mb-4">
//                 <Col md={4}>
//                   <div className="fw-bold">Billed to:</div>
//                   <div>{this.props.info.billTo||''}</div>
//                   <div>{this.props.info.billToAddress||''}</div>
//                   <div>{this.props.info.billToEmail||''}</div>
//                 </Col>
//                 <Col md={4}>
//                   <div className="fw-bold">Billed From:</div>
//                   <div>{this.props.info.billFrom||''}</div>
//                   <div>{this.props.info.billFromAddress||''}</div>
//                   <div>{this.props.info.billFromEmail||''}</div>
//                 </Col>
//                 <Col md={4}>
//                   <div className="fw-bold mt-2">Date Of Issue:</div>
//                   <div>{this.props.info.dateOfIssue||''}</div>
//                 </Col>
//               </Row>
//               <Table className="mb-0">
//                 <thead>
//                   <tr>
//                     <th>QTY</th>
//                     <th>DESCRIPTION</th>
//                     <th className="text-end">PRIX_UNITAIRE</th>
//                     <th className="text-end">AMOUNT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.props.items.map((item, i) => {
//                     return (
//                       <tr id={i} key={i}>
//                         <td style={{width: '70px'}}>
//                           {item.QUANTITE}
//                         </td>
//                         <td>
//                           {item.name} - {item.description}
//                         </td>
//                         <td className="text-end" style={{width: '100px'}}>{item.PRIX_UNITAIRE}</td>
//                         <td className="text-end" style={{width: '100px'}}> {item.PRIX_UNITAIRE * item.QUANTITE}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//               <Table>
//                 <tbody>
//                   <tr>
//                     <td>&nbsp;</td>
//                     <td>&nbsp;</td>
//                     <td>&nbsp;</td>
//                   </tr>
//                   <tr className="text-end">
//                     <td></td>
//                     <td className="fw-bold" style={{width: '100px'}}>MONTANT</td>
//                     <td className="text-end" style={{width: '100px'}}> {this.props.MONTANT}</td>
//                   </tr>
//                   {this.props.taxAmmount != 0.00 &&
//                     <tr className="text-end">
//                       <td></td>
//                       <td className="fw-bold" style={{width: '100px'}}>TAX</td>
//                       <td className="text-end" style={{width: '100px'}}> {this.props.taxAmmount}</td>
//                     </tr>
//                   }
//                   {this.props.discountAmmount != 0.00 &&
//                     <tr className="text-end">
//                       <td></td>
//                       <td className="fw-bold" style={{width: '100px'}}>DISCOUNT</td>
//                       <td className="text-end" style={{width: '100px'}}> {this.props.discountAmmount}</td>
//                     </tr>
//                   }
//                   <tr className="text-end">
//                     <td></td>
//                     <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
//                     <td className="text-end" style={{width: '100px'}}> {this.props.total}</td>
//                   </tr>
//                 </tbody>
//               </Table>
//               {this.props.info.notes &&
//                 <div className="bg-light py-3 px-4 rounded">
//                   {this.props.info.notes}
//                 </div>}
//             </div>
//           </div>
//           <div className="pb-4 px-4">
//             <Row>
//               <Col md={6}>
//                 <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
//                   <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Send Invoice
//                 </Button>
//               </Col>
//               <Col md={6}>
//                 <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
//                   <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
//                   Download Copy
//                 </Button>
//               </Col>
//             </Row>
//           </div>
//         </Modal>
//         <hr className="mt-4 mb-3"/>
//       </div>
//     )
//   }
// }

// export default InvoiceModal;