import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/class/car';
import { Reservation } from 'src/app/class/resevation';
import { User } from 'src/app/class/user';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  cars:any;
  the_car_selected:any;
  car = new Car;
  
  user_id:any;
  user =new User;
  cli: boolean=false;
  res = new Reservation;
  constructor(private dataService:ServicesService,private router: Router) { }

  ngOnInit(): void {
    this.get_car_selected();
    this.GetAllItems();
  }
  select_car(name:any){
    this.dataService.getCarByName(name).subscribe(res => {
    this.cars = res;
    this.car= this.cars;
    });
  }
  get_car_selected(){
    this.the_car_selected =localStorage.getItem("car");
    if(this.the_car_selected != null){
      this.select_car(this.the_car_selected);
      
    }
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
      if(this.user.username!=null){
       
        this.cli=true;
    
      }else{
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
     
    }
}
