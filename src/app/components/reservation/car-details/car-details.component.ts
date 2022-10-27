import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/class/car';
import { Place } from 'src/app/class/place';
import { Reservation } from 'src/app/class/resevation';
import { User } from 'src/app/class/user';
import { ServicesService } from 'src/app/service/services.service';
import { enableRipple } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  cars:any;
  the_car_selected:any;
  car = new Car;
  places:any;
  place = new Place;
  user_id:any;
  user =new User;
  cli: boolean=false;
  res = new Reservation;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fiveFormGroup: FormGroup;
    selectedCard: any;
  place_id: any;
  constructor(private dataService:ServicesService,private router: Router,private _formBuilder: FormBuilder,private cdr: ChangeDetectorRef) { }
  public watermark: string = 'Select a time';
  // sets the format property to display the time value in 24 hours format.
  public formatString: string = 'HH:mm';
  public interval: number = 60;
  ngOnInit(): void {
    
    this.get_car_selected();
    this.GetAllItems();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
      seventhCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      eightthCtrl: ['', Validators.required],

    });
    this.fiveFormGroup = this._formBuilder.group({
      ninethCtrl: ['', Validators.required],

    });
    
    this.getPickup();
  }
  select_car(name:any){
    this.dataService.getCarByName(name).subscribe(res => {
    this.cars = res;
    this.car= this.cars;
    });
  }
  getPickup(){
      this.dataService.getPlaces().subscribe(res => {
        this.places = res;

  });
}
  get_car_selected(){
    this.the_car_selected =localStorage.getItem("car");
    if(this.the_car_selected != null){
      this.select_car(this.the_car_selected);
      
    }
  }
  public selectCard0(card: any): void {
    this.selectedCard = card;
    this.cdr.detectChanges();
    this.place_id=card.id;
    console.log(this.selectedCard.id);
}
getResInfo(){
  this.res.car_name=localStorage.getItem("car");
  this.res.days=localStorage.getItem("num jr");
  this.res.id_user=this.user_id;
  this.res.date_debut=localStorage.getItem("debut");
  this.res.date_fin=localStorage.getItem("fin");
  

}

  getUserInfo() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      
      this.user.username=JSON.parse(payload).username;
      this.user_id=JSON.parse(payload).user_id;
      this.user.card_id_or_passeport=JSON.parse(payload).card_id_or_passeport;
      this.user.first_name=JSON.parse(payload).first_name;
      this.user.driving_license=JSON.parse(payload).driving_license;
      this.user.age=JSON.parse(payload).age;
      this.user.last_name=JSON.parse(payload).last_name;
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  
   getToken() {
    return localStorage.getItem("token");
  }

  GetAllItems(){
     
    this.getUserInfo();
    this.getResInfo();

      if(this.user.username!=null){
       
        this.cli=true;
    
      }else{
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
     
    }
}
