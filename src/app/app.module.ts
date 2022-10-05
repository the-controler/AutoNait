import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/Accueil/slider/slider.component';
import { BodyComponent } from './components/Accueil/body/body.component';
import { NavbarComponent } from './components/Accueil/navbar/navbar.component';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {   MatButtonModule } from '@angular/material/button';
import {   MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatStepperModule } from '@angular/material/stepper';
import { AddclientComponent } from './components/Accueil/addclient/addclient.component';
import { FooterComponent } from './components/Accueil/footer/footer.component';

import '@angular/localize/init';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    NavbarComponent,
    SliderComponent,
    AddclientComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatButtonModule,
    NgbModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
