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
  /*-----variable declaration----*/
  body: any;
  response: any;
  itemName: any;
  flash = false;
  errorMsg: any;
  constructor(private apiservice: ApiService,private router: Router) {}
  /*-----add form ----*/
  addUser(item: any){
    this.body = {
      name : item.name,
      state : item.state,
      zip : item.zip,
      amount : item.amount,
      qty : item.quantity,
      item : item.itemval  
    }
 
  this.apiservice.addList(this.body).subscribe({
        next: (data) => {
          this.response = data;
          if(this.response.error){
            this.errorMsg = this.response.error;
          }else{
            this.router.navigate(['/list']);
          }
        },
        error: (e) => {
          this.response = 'Error occured';
        },
        complete: () => console.log('done'),
      });
  }
  /*-----Item check with csv table----*/
  checkItem(name: any){
    this.itemName = name.value;
    this.apiservice.checkItem(this.itemName).subscribe({
      next: (data) => {
        if(data && data[0] && data[0] == 'Already Exist'){
          this.flash = true;
       }else{
        this.flash = false;
       }
      },
      error: (e) => {
        this.response = 'Error occured';
      },
      complete: () => console.log('done'),
    });
  }
}
