import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './components/Accueil/body/body.component';
import { CarDetailsComponent } from './components/reservation/car-details/car-details.component';
import { CarViewComponent } from './components/car/car-view/car-view.component';

const routes: Routes = [
  { path: '', component:BodyComponent},
  {path:':name',component:CarDetailsComponent},
  {path:':name/details',component:CarViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
