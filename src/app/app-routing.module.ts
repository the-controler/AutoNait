import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './components/Accueil/slider/slider.component';
import { BodyComponent } from './components/Accueil/body/body.component';
import { NavbarComponent } from './components/Accueil/navbar/navbar.component';
import { CarDetailsComponent } from './components/reservation/car-details/car-details.component';

const routes: Routes = [
  { path: '', component:BodyComponent},
  {path:':name',component:CarDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
