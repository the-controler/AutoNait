import { Component, OnInit , ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ServicesService } from 'src/app/service/services.service';

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


  constructor(private dataService:ServicesService ) { }

  ngOnInit(): void {
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

}
