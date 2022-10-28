import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ServicesService } from 'src/app/service/services.service';
import { SliderComponent } from '../slider/slider.component';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('200ms')
      ])
    ])
  ]
})
export class BodyComponent implements OnInit {

  cars:any;

  data: any = {
    imageId: "pDGNBK9A0sk",
    state: "default"
  };
  data1: any = {
    imageId: "pDGNBK9A0sk",
    state: "default"
  };
  data2: any = {
    imageId: "pDGNBK9A0sk",
    state: "default"
  };
  data3: any = {
    imageId: "pDGNBK9A0sk",
    state: "default"
  };
  car_name: any;
  username: any;
  cli: boolean=false;


  constructor(private dataService:ServicesService ,private router: Router) { }

  ngOnInit(): void {
    this.getcars();
    this.car_name=localStorage.getItem('car');
this.GetAllItems();
  }
  getcars(){
    this.dataService.getcars().subscribe(res => {
    this.cars = res;
 
    });
  }
  save_id_car($id: any){
    localStorage.setItem('car', $id);
  }
  details_car(){
    this.router.navigate(['/'+this.car_name+'/details']).then(() => {
      window.location.reload();
    });
  }
 
  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }
  cardClicked1() {
    if (this.data1.state === "default") {
      this.data1.state = "flipped";
    } else {
      this.data1.state = "default";
    }
  }
  cardClicked2() {
    if (this.data2.state === "default") {
      this.data2.state = "flipped";
    } else {
      this.data2.state = "default";
    }
  }
  cardClicked3() {
    if (this.data3.state === "default") {
      this.data3.state = "flipped";
    } else {
      this.data3.state = "default";
    }
  }

  GetAllItems(){
     
    this.getUserInfo();
      if(this.username!=null){
        this.cli=true;
    
      }
     
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
}
