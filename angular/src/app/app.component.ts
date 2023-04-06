import { Component } from '@angular/core';
import { ColDef,GridReadyEvent } from 'ag-grid-community';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ ApiService ]
})
export class AppComponent {
  constructor(private apiservice: ApiService,private router: Router) {}
  }
