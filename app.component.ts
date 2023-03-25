import { Component } from '@angular/core';
import { ColDef,GridReadyEvent } from 'ag-grid-community';
//import { AgGridAngular } from 'ag-grid-angular';
import { ApiService } from './services/api.service';
//import { Observable } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ ApiService ]
})
export class AppComponent {
  title = 'angulartable';
  constructor(private apiservice: ApiService,private router: Router) {}
  
  rowData: any = [];
  gridAPI: any;
  columnAPI :any;
  searchText = '';
  // For accessing the Grid's API
 //@ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  
    ngOnInit(){   
      this.loadList();
    }

    loadList(){
      this.apiservice.getList().subscribe((data)=>{
        console.log(data);
        this.rowData = data;
      }) 
    }
    
    onGridReady(params: any){
      this.gridAPI = params.api;
      this.columnAPI = params.columnApi;
    }

    search(){
        this.gridAPI.setQuickFilter(this.searchText)
    }
    selectedRows(){
      let selectedrRows = this.gridAPI.getSelectedRows();
      console.log(selectedrRows);
    }
    
  colDefs: ColDef[] = [
    { field: 'id',headerName: 'ID',filter: true, sortable: true,checkboxSelection: true,headerCheckboxSelection: true},
    { field: 'name', headerName: 'Name', filter: true, sortable: true},
    { field: 'state', headerName: 'State',filter: true, sortable: true},
    { field: 'zip', headerName: 'Zip',filter: true, sortable: true},
    { field: 'amount',headerName: 'Amount',filter: true, sortable: true},
    { field: 'qty',headerName: 'Qty',filter: true, sortable: true},
    { field: 'item',headerName: 'Item',filter: true, sortable: true}
  ];
  goTo(url: string){
    this.router.navigate([url]);
   }
}
