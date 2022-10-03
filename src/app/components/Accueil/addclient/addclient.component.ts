import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ServicesService } from 'src/app/service/services.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],secondCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required], fourthCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    fifthCtrl: ['', Validators.required], sixthCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    sevenCtrl: ['', Validators.required], eighthCtrl: ['', Validators.required],
  });
  isLinear = false;
  submitted= false;
  username=false;
  form : FormGroup | any;

  user = new User();
  users:any;
  constructor(private dataService:ServicesService 
    ,private _formBuilder: UntypedFormBuilder,private router: Router) { }

  ngOnInit(): void {
  }
  AddUser(){
    


     this.dataService.registerUser(this.user).subscribe(res=>{
         console.log(res);
         this.submitted= true;
         this.username=false;
       this.router.navigate(['/']);
       },
       (error) => {                              //Error callback
         console.error('error caught in component')
         this.usern();        
   
         //throw error;   //You can also throw the error to a global error handler
       }
       )




     }
    
  
    
    get f(){

      return this.form.controls;}

      usern(){
        this.username=true;
      }
}

