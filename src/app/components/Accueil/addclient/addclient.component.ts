import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, UntypedFormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { ServicesService } from 'src/app/service/services.service';
import { catchError } from 'rxjs';
enum CheckBoxType { APPLY_FOR_JOB, MODIFY_A_JOB, NONE };

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
  logsubmitted= false;
  username=false;
  form : FormGroup | any;
  data:any;
  token:any;
  user = new User();
  users:any;
  loginfalse=false;
  constructor(private dataService:ServicesService
    ,private _formBuilder: UntypedFormBuilder,private router: Router) { }

  ngOnInit(): void {
  }
  AddUser(){



     this.dataService.registerUser(this.user).subscribe(res=>{
      this.data = res;

      this.submitted= true;
      this.username=false;
       localStorage.setItem('user_card_id_or_passeport', this.user.card_id_or_passeport);
      localStorage.setItem('user_fname', this.user.first_name);
       localStorage.setItem('user_lname', this.user.last_name);
       localStorage.setItem('username', this.user.username);

      this.login();
        





       },
       (error) => {
         console.error('error caught in component')
         this.usern();

       }
       )




     }




    login(){

      this.logsubmitted = true;
        this.dataService.loginUser(this.user).subscribe(res =>{
          this.data = res;
          //console.log(res);
          if(this.data.status ===1) {
            this.token = this.data.data.token;
            localStorage.setItem('token', this.token);
            console.log(this.token);
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
            
          }
          
    
        }
        ,
       (error) => {
         console.error('error caught in component')
         this.loginfalse = true;
         console.log("not workkk");
       });


    }

      usern(){
        this.username=true;
      }



      check_box_type = CheckBoxType;

  currentlyChecked: CheckBoxType;

  selectCheckBox(targetType: CheckBoxType) {
    if(this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }
}

