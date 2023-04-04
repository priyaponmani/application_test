import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  body: any;
  response: any;
  constructor(private apiservice: ApiService,private router: Router) {}
  addUser(item: any){
    this.body = {
      name : item.name,
      state : item.state,
      zip : item.zip,
      amount : item.amount,
      qty : item.quantity,
      item : item.itemval  
    }

   // console.log(item);
  this.apiservice.addList(this.body).subscribe((data)=>{
    this.response = data;
    this.router.navigate(['/list']);
  })  
  }
}
