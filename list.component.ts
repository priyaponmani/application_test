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
  selectedID: any;
  rowData: any = [];
  gridAPI: any;
  columnAPI :any;
  searchText = '';  
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
      //
      //this.selectedID = selectedrRows.filter({id});
      //console.log(selectedrRows);
      this.apiservice.deleteList(selectedrRows).subscribe((data)=>{
        console.log(data);
        this.rowData = data;
      }) 
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
