import { Injectable } from '@angular/core';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class PrintPDFService {

  pdfMake: any;

  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async generatePdf(totalValue, itemArray) {
    await this.loadPdfMaker();
    const def = this.getDocumentDefinition(totalValue, itemArray);
    this.pdfMake.createPdf(def).open();
  }

  formatCurrentDate() {
    var dateString = new Date().toLocaleString('en-AU');
    var currentDate = new Date(dateString);
    var date = currentDate.toLocaleDateString('en-US');
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var mins = minutes < 10 ? '0' + minutes : minutes;
    var finalDate = date + ' ' + hours + ':' + mins + ' ' + ampm;
    return finalDate;
  }

  getDocumentDefinition(totalValue, itemArray) {
    var dataArray = [];
    itemArray.forEach(element => {
      var dataObj = [];
      dataObj.push(element.name);
      dataObj.push("$" + element.rate);
      dataObj.push(element.quantity);
      dataObj.push("$" + element.amount);
      dataArray.push(dataObj);
    });

    this.pdfMake.tableLayouts = {
      myLayout: {
        hLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length) {
            return 1;
          }
          return 0;
        },
        vLineWidth: function (i, node) {
          if (i === 0 || i === node.table.body.length + 1) {
            return 1;
          }
          return 1;
        },
        hLineColor: function (i) {
          return i === 1 ? 'black' : '#aaa';
        },
        paddingLeft: function (i) {
          return 8;
        },
        paddingTop: function (i, node) {
          return 8;
        },
        paddingBottom: function (i, node) {
          return 8;
        }
      }
    };


    var docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 140, 40, 60],
      header: [{
        columns: [
          {
            width: '*',
            text: 'Report',
            fontSize: 30,
            margin: [40, 20, 0, 0]
          },
          {
            width: 80,
            text: ''
          },
          {
            width: '*',
            text: this.formatCurrentDate(),
            fontSize: 14,
            margin: [40, 35, 0, 0]
          },
          {
            image: 'data:image/png;base64,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',
            width: 160,
            height: 100,
            margin: [0, 0, 60, 0]
          }
        ],
        columnGap: 0
      }, { canvas: [{ type: 'rect', x: 40, y: -40, w: 380, h: 1 }] }],
      footer: [{ canvas: [{ type: 'rect', x: 40, y: 0, w: 520, h: 1 }] }, {
        columns: [
          {
            width: 'auto',
            text: 'Ace Contractors Group Pty. Ltd.',
            fontSize: 16,
            margin: [40, 10, 0, 0]
          },
          {
            width: '*',
            text: 'ABN 12 345 678 901',
            fontSize: 16,
            margin: [0, 10, 20, 0]
          }
        ],
        columnGap: 150
      }],
      content: [

        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', 100, 100, '*'],

            body: [
              [{ text: 'Item', bold: true, alignment: 'center' }, { text: 'Rate', bold: true, alignment: 'center' }, { text: 'Quantity', bold: true, alignment: 'center' }, { text: 'Amount', bold: true, alignment: 'center' }]
            ]
          },
          style: 'itemHeader'
        },
        {
          layout: 'myLayout',
          table: {
            headerRows: 1,
            widths: ['*', 100, 100, '*'],
            body: dataArray
          },
          alignment: 'center'
        }, {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: ['*', 100, 100, '*'],
            body: [
              ['', '', { text: 'Total: ', bold: true, fontSize: 12, alignment: 'right', margin: [0, 10, 0, 0] }, { text: "$ " + totalValue, bold: true, fontSize: 12, alignment: 'center', margin: [0, 10, 0, 0] }]
            ]
          }
        }, {
          text: 'Ace Person',
          margin: [0, 100, 0, 0]
        }, {
          text: 'Project Manager',
          margin: [0, 5, 0, 0],
          bold: true,
          startPosition: {
            left: 60
          }
        }
      ],
      styles: {
        itemHeader: {
          margin: [0, 0, 0, 0]
        }
      }
    };
    return docDefinition;
  }

}
