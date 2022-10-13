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

  user_id:any;
  car_name:any;
  
  token:any;
  card_id_or_passeport: any;
  age: any;
  username: any;

  constructor(private dataService:ServicesService 
    ,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private _formBuilder: UntypedFormBuilder,private router: Router) { 


     this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
cars:any;

nocli=true;
cli=false;
user_name:any;
user_lname:any;
pp='none';
driving_license:any;


  ngOnInit(): void {
 

    this.GetAllItems();


    this.getUserInfo();

     this.minPickerDate = {
      // year:   this.nyear , month:  this.nmonth , day: this.nday
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
     } ;

    this.getcars();
    

  }

GetAllItems(){
  this.getUserInfo();
  this.car_name=localStorage.getItem('car');
  if(this.username!=null){
    this.nocli=false;
    this.cli=true;

  }
}
details_car(){
  this.router.navigate(['/:'+this.car_name+'/details']).then(() => {
    window.location.reload();
  });
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
     localStorage.setItem('debut', this.date1);
     localStorage.setItem('fin', this.date2);
     localStorage.setItem('num jr', this.Days);
     this.router.navigate(['/:'+this.car_name]).then(() => {
      window.location.reload();
    });
return this.Days;
    }

     createDateFromNgbDate(ngbDate: NgbDate): Date {
      const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month-1, ngbDate.day));  
      return date;
    }





    getUserInfo() {
      const token = this.getToken();
      let payload;
      if (token) {
        payload = token.split(".")[1];
        payload = window.atob(payload);
        this.card_id_or_passeport=JSON.parse(payload).card_id_or_passeport;
        this.user_name=JSON.parse(payload).first_name;
        this.driving_license=JSON.parse(payload).driving_license;
        this.age=JSON.parse(payload).age;
        this.user_lname=JSON.parse(payload).last_name;
        this.username=JSON.parse(payload).username;
        this.user_id=JSON.parse(payload).user_id;

        return JSON.parse(payload);
      } else {
        return null;
      }
    }
    
     getToken() {
      return localStorage.getItem("token");
    }
}


