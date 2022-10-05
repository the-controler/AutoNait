import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {UntypedFormBuilder, Validators,FormGroup} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
 

  Days: any;
  Time: any;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  model: NgbDateStruct;
  
  minPickerDate:NgbDateStruct;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  date2: any;
  date1: any;
  diffInDays: number;
  constructor(private dataService:ServicesService 
    ,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private _formBuilder: UntypedFormBuilder) { 


     this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
cars:any;
  ngOnInit(): void {
 





    console.log('time'+this.Time);
    console.log(this.Days);


     this.minPickerDate = {
      // year:   this.nyear , month:  this.nmonth , day: this.nday
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
     } ;

    this.getcars();
    

  }
  getcars(){
    this.dataService.getcars().subscribe(res => {
    this.cars = res;
 
    });
  }
  save_id_car($id: any){
    localStorage.setItem('car', $id);
  }
  save_date_of_res($deb:any,$fin:any){
    
  }


  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
        date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
        this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }



  

calcdays(){
  this.date1 =this.createDateFromNgbDate(this.fromDate!);
  this.date2 =this.createDateFromNgbDate(this.toDate!);

     this.Time = this.date2.getTime() - this.date1.getTime(); 
     this.Days = this.Time / (1000 * 3600 * 24); //Diference in Days
     console.log(this.Days);
     
return this.Days;
    }

    private createDateFromNgbDate(ngbDate: NgbDate): Date {
      const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month-1, ngbDate.day));  
      return date;
    }


}


