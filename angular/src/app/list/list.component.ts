import { Component } from '@angular/core';
import { ColDef,GridReadyEvent } from 'ag-grid-community';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[ ApiService ]
})
export class ListComponent {
  title = 'angulartable';
  
  constructor(private apiservice: ApiService,private router: Router) {}
  /*-----variable declaration----*/
  selectedID: any;
  rowData: any = [];
  gridAPI: any;
  columnAPI :any;
  searchText = '';  
  ngOnInit(){   
      this.loadList();
  }
    /*-----get list and assign data----*/
    loadList(){
      this.apiservice.getList().subscribe({
        next: (data) => {
          this.rowData = data;
        },
        error: (e) => {
          this.rowData = 'Error occured';
        },
        complete: () => console.log('done'),
      });
    }
    /*-----table row and column creation----*/
    onGridReady(params: any){
      this.gridAPI = params.api;
      this.columnAPI = params.columnApi;
    }
    /*-----search from csv file----*/
    search(){
        this.gridAPI.setQuickFilter(this.searchText)
    }
    /*-----single delete and multiple delete----*/
    selectedRows(){
      let selectedrRows = this.gridAPI.getSelectedRows();
      this.apiservice.deleteList(selectedrRows).subscribe({
        next: (data) => {
          this.rowData = data;
        },
        error: (e) => {
          this.rowData = 'Error occured';
        },
        complete: () => console.log('done'),
      });
    }
  /*-----column definition----*/  
  colDefs: ColDef[] = [
    { field: 'id',headerName: 'ID',filter: true, sortable: true,checkboxSelection: true,headerCheckboxSelection: true},
    { field: 'name', headerName: 'Name', filter: true, sortable: true},
    { field: 'state', headerName: 'State',filter: true, sortable: true},
    { field: 'zip', headerName: 'Zip',filter: true, sortable: true},
    { field: 'amount',headerName: 'Amount',filter: true, sortable: true},
    { field: 'qty',headerName: 'Qty',filter: true, sortable: true},
    { field: 'item',headerName: 'Item',filter: true, sortable: true}
  ];
  /*-----Redirection----*/
  goTo(url: string){
    this.router.navigate([url]);
   }
}
