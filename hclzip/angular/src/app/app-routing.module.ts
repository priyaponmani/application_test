import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

/*-----Routing for path----*/
const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent },
  { path: "", component: ListComponent }
];

/*-----Routing for module----*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
