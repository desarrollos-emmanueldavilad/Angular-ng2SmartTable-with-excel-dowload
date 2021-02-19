import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'table';
  datos: any;
  public rows: Array<any> = [];
  public columns: Array<any> = [];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };
  dataArray: any[];

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      title: {
        title: 'Title'
      },
      url: {
        url: 'URl'
      }
    }
  };


  constructor(private http: HttpClient) {
    this.GetDatos()
  }



  GetDatos() {
    let url = "https://jsonplaceholder.typicode.com/photos";
    this.http.get(url).subscribe(res => {
      this.dataArray = [];
      this.dataArray.push(res);

      this.dataArray.map(res => {
        console.log('RESSS', res);
        this.datos = res;
      })
      return res;
    })
  }


  descargarExcel(){
    this.exportAsExcelFile(this.datos, 'prueba')
  }


  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('sss', ws);

    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'TESTTT');

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



}
