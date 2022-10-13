import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/class/car';
import { CarImg } from 'src/app/class/car-img';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css','./nicepage.css']
})
export class CarViewComponent implements OnInit {
  currentIndex: any = -1;
  showFlag: any = false;

  cars:any;
  carss:any;
  the_car_selected:any;
  car_img = new CarImg;
  car = new Car;
  numbers: number[];
  username: any;
  cli: boolean= false;
  constructor(private dataService:ServicesService) {
   }

  ngOnInit(): void {
    this.get_car_selected();
    this.GetAllItems();
  }
  showLightbox(index: any) {
    this.currentIndex = index;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
  select_car(name:any){
    this.dataService.getCarImageByName(name).subscribe(res => {
    this.cars = res;
    });
  }
  get_car_selected(){
    this.the_car_selected =localStorage.getItem("car");
    if(this.the_car_selected != null){
      this.select_car(this.the_car_selected);
      this.select_car_org(this.the_car_selected);
    }
  }
  select_car_org(name:any){
    this.dataService.getCarByName(name).subscribe(res => {
    this.carss = res;
    this.car= this.carss;
    });
  }
  getUserInfo() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      
      this.username=JSON.parse(payload).username;

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
      if(this.username!=null){
       
        this.cli=true;
    
      }
     
    }
}
