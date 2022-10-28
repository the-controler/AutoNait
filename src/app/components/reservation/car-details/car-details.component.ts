import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/class/car';
import { Place } from 'src/app/class/place';
import { Reservation } from 'src/app/class/resevation';
import { User } from 'src/app/class/user';
import { ServicesService } from 'src/app/service/services.service';
import { PickerInteractionMode } from 'igniteui-angular';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
    public format = 'HH:mm ';
    public date: Date = new Date();
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
  card1:any;
  total:number | null = null;
  data: any;
  submitted= false;
  place_name: any;
;
  price :number | null = null;
  days:number | null = null;;
  constructor(private dataService:ServicesService,private router: Router,private _formBuilder: FormBuilder,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.get_car_selected();
    this.GetAllItems();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required],
      seventhCtrl: ['', Validators.required],
      eightthCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      ninethCtrl: ['', Validators.required],

    });
    this.fiveFormGroup = this._formBuilder.group({
      lastCtrl: ['', Validators.required],

    });
    
    this.getPickup();
  }
  select_car(name:any){
    this.dataService.getCarByName(name).subscribe(res => {
    this.cars = res;
    this.car= this.cars;
localStorage.setItem('price_day', this.car.price);

    });
  }
  getPickup(){
      this.dataService.getPlaces().subscribe(res => {
        this.places = res;

  });
  this.days=Number(this.res.days);
  this.price =Number(localStorage.getItem("price_day"));

  this.total= this.price*this.days;
}
  get_car_selected(){
    this.the_car_selected =localStorage.getItem("car");
    if(this.the_car_selected != null){
      this.select_car(this.the_car_selected);
      
    }
  }
  details_car(){
    this.router.navigate(['/'+this.res.car_name+'/details']).then(() => {
      window.location.reload();
    });
  }
  public selectCard0(card: any): void {
    this.selectedCard = card;
    this.cdr.detectChanges();
    this.place_name=card.name;
  }
public selectCard1(card: any): void {
  this.selectedCard = card;
  this.cdr.detectChanges();
 
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
Reserve(){
  this.res.price=this.total;
  
    this.res.place = this.place_name;
    this.res.hour=this.res.hour.getHours()+':'+ this.res.hour.getMinutes();
   this.dataService.create_res(this.res).subscribe(res=>{
     this.data = res;
  
     this.submitted= true;
   })
    
}

  }
