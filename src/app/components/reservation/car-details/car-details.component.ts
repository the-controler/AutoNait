import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/class/car';
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
  constructor(private dataService:ServicesService) { }

  ngOnInit(): void {
    this.get_car_selected();
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
}
