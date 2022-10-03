import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './components/Accueil/slider/slider.component';
import { BodyComponent } from './components/Accueil/body/body.component';
import { NavbarComponent } from './components/Accueil/navbar/navbar.component';
const routes: Routes = [
  { path: '', component:BodyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
