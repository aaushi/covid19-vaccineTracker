import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StateComponent } from './components/state/state.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';


const routes: Routes = [{
  path:'',component:HomeComponent,
},
{
  path:'state',component:StateComponent,
},
{
  path:'vaccination',component:VaccinationComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
